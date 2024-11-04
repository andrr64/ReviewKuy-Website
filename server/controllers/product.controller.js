import { serverBadRequest, serverConflict, serverCreated, serverError, serverSuccess, serverNotFound } from "../utility/response_helper.js";
import sequelize from '../db.js';
import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import ProductSpecification from "../models/product.specification.model.js";
import ProductImage from "../models/product.image.model.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"; // Tambahkan Firebase Storage
import { firebaseApp } from "../index.js";

// Fungsi untuk meng-upload file yang di-decode dari base64 ke Firebase
const uploadToFirebase = async (base64, fileName) => {
    const storage = getStorage(firebaseApp);

    const storageRef = ref(storage, `product.images/${fileName}`);

    // Cek dan potong header base64 jika ada
    const base64Data = base64.split(',')[1];

    // Validasi base64
    if (!base64Data) {
        throw new Error('Invalid base64 data');
    }

    try {
        const buffer = Buffer.from(base64Data, 'base64');
        const snapshot = await uploadBytes(storageRef, buffer);
        return await getDownloadURL(snapshot.ref);
    } catch (error) {
        console.error('Upload error:', error);
        throw new Error('Upload failed: ' + error.message);
    }
};

const deleteFromFirebase = async (fileName) => {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `product.images/${fileName}`);
    try {
        await deleteObject(storageRef);
    } catch (error) {
    }
};

export const createProduct = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { name, description, brand_id, category_id, specification_data, pictures } = req.body;

        if (!name || !brand_id || !category_id || !specification_data || !pictures) {
            return serverBadRequest(res, 'All fields are required.');
        }

        const existingProduct = await Product.findOne({ where: { name, brand_id }, transaction });
        if (existingProduct) {
            return serverConflict(res, 'Product already exists');
        }

        const newProduct = await Product.create({ name, description, brand_id, category_id }, { transaction });

        for (const spec of specification_data) {
            await ProductSpecification.create({ product_id: newProduct.id, ...spec }, { transaction });
        }

        const uploadedPictureData = [];
        for (const pict of pictures) {
            console.log(pict.index);

            const fileName = `${newProduct.id}_image_${pict.index}`;
            const imageUrl = await uploadToFirebase(pict.base64, fileName);

            uploadedPictureData.push({
                product_id: newProduct.id,
                index: pict.index,
                image_url: imageUrl
            });
        }

        for (const picture of uploadedPictureData) {
            await ProductImage.create(picture, { transaction });
        }

        await transaction.commit();
        return serverCreated(res, 'Product created successfully', newProduct);

    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return serverError(res, 'Failed to create product');
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        const formattedProducts = await Promise.all(products.map(async (product) => {
            const specifications = await ProductSpecification.findAll({
                where: { product_id: product.id },
                order: [['index', 'ASC']] // Urutkan berdasarkan id secara ascending
            });

            const pictures = await ProductImage.findAll({
                where: { product_id: product.id },
                order: [['index', 'ASC']] // Urutkan berdasarkan id secara ascending
            });

            const brand = await Brand.findOne({ where: { id: product.brand_id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
            const category = await Category.findOne({ where: { id: product.category_id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

            return {
                id: product.id,
                name: product.name,
                description: product.description,
                brand: brand,
                category: category,
                specifications: specifications.map(spec => ({
                    spec_opt_id: spec.spec_opt_id,
                    value: spec.value,
                })),
                pictures: pictures.map(pic => pic.image_url),
            };
        }));

        return res.json(formattedProducts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve products' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({
            where: { id }
        });

        if (!product) {
            return serverNotFound(res, 'Product not found');
        }

        const specifications = await ProductSpecification.findAll({
            where: { product_id: product.id },
            order: [['index', 'ASC']] // Urutkan berdasarkan id secara ascending
        });

        const pictures = await ProductImage.findAll({
            where: { product_id: product.id },
            order: [['index', 'ASC']] // Urutkan berdasarkan id secara ascending
        });

        const brand = await Brand.findOne({ where: { id: product.brand_id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
        const category = await Category.findOne({ where: { id: product.category_id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

        const formattedProduct = {
            id: product.id,
            name: product.name,
            description: product.description,
            brand: brand,
            category: category,
            specifications: specifications.map(spec => ({
                spec_opt_id: spec.spec_opt_id,
                value: spec.value,
            })),
            pictures: pictures.map(pic => pic.image_url),
        };

        return res.json(formattedProduct);
    } catch (error) {
        console.error(error);
        return serverError(res, 'Failed to retrieve product');
    }
};

// Fungsi untuk mendapatkan produk berdasarkan kategori
export const getProductByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findAll({ where: { category_id: id } });

        // Mengambil spesifikasi, gambar, brand, dan category untuk setiap produk
        const formattedProducts = await Promise.all(products.map(async (product) => {
            const specifications = await ProductSpecification.findAll({
                where: { product_id: product.id },
            });

            const pictures = await ProductImage.findAll({
                where: { product_id: product.id },
            });

            const brand = await Brand.findOne({ where: { id: product.brand_id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
            const category = await Category.findOne({ where: { id: product.category_id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

            return {
                id: product.id,
                name: product.name,
                description: product.description,
                brand: brand,
                category: category,
                specifications: specifications.map(spec => ({
                    name: spec.name,
                    value: spec.value,
                })),
                pictures: pictures.map(pic => pic.image_url),
            };
        }));

        return res.json(formattedProducts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve products by category' });
    }
};

// Fungsi untuk mendapatkan produk berdasarkan brand
export const getProductByBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findAll({ where: { brand_id: id } });

        // Mengambil spesifikasi, gambar, brand, dan category untuk setiap produk
        const formattedProducts = await Promise.all(products.map(async (product) => {
            const specifications = await ProductSpecification.findAll({
                where: { product_id: product.id },
            });

            const pictures = await ProductImage.findAll({
                where: { product_id: product.id },
            });

            const brand = await Brand.findOne({ where: { id: product.brand_id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
            const category = await Category.findOne({ where: { id: product.category_id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

            return {
                id: product.id,
                name: product.name,
                description: product.description,
                brand: brand,
                category: category,
                specifications: specifications.map(spec => ({
                    name: spec.name,
                    value: spec.value,
                })),
                pictures: pictures.map(pic => pic.image_url),
            };
        }));

        return res.json(formattedProducts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to retrieve products by brand' });
    }
};

export const updateProduct = async (req, res) => {
    const transaction = await sequelize.transaction(); // Mulai transaksi

    try {
        const { id } = req.params;
        const {
            name, description, brand_id, category_id, specification_data,
            pictures, new_thumbnail_base64, new_galery_base64
        } = req.body;

        if (!name && !description && !brand_id && !category_id && !specification_data && !pictures) {
            return serverBadRequest(res, 'At least one field is required to update.');
        }

        const existingProduct = await Product.findOne({ where: { id } });
        if (!existingProduct) {
            return serverNotFound(res, 'Product not found');
        }

        await Product.update({
            name, description, brand_id, category_id
        }, {
            where: { id },
            transaction
        });

        // Update atau Hapus dan buat spesifikasi baru
        await ProductSpecification.destroy({
            where: { product_id: id },
            transaction
        });

        if (specification_data) {
            for (const spec of specification_data) {
                await ProductSpecification.create({
                    product_id: id, ...spec
                }, { transaction });
            }
        }

        // Update gambar utama (thumbnail)
        if (new_thumbnail_base64) {
            try {
                // Hapus thumbnail lama
                await ProductImage.destroy({
                    where: { product_id: id, index: 0 },
                    transaction
                });
                // Hapus file di Firebase
                await deleteFromFirebase(`${id}_image_0`);
            } catch (error) {

            }
            const thumbnailUrl = await uploadToFirebase(new_thumbnail_base64, `${id}_image_0`);
            await ProductImage.create({
                product_id: id,
                index: 0,
                image_url: thumbnailUrl
            }, { transaction });
        }

        // // Update galeri gambar
        // if (new_galery_base64) {
        //     await ProductImage.destroy({
        //         where: { product_id: id, index: { [Op.ne]: 0 } },
        //         transaction
        //     });

        //     for (const [index, pict] of new_galery_base64.entries()) {
        //         const fileName = `${id}_image_${index + 1}`;
        //         await deleteFromFirebase(fileName); // Hapus file lama
        //         const imageUrl = await uploadToFirebase(pict, fileName); // Unggah file baru

        //         await ProductImage.create({
        //             product_id: id,
        //             index: index + 1,
        //             image_url: imageUrl
        //         }, { transaction });
        //     }
        // }
        await transaction.commit();
        return serverSuccess(res, 'Product updated successfully');
    } catch (error) {
        await transaction.rollback();
        return serverError(res, 'Failed to update product');
    }
};

export const deleteProduct = async (req, res) => {
    const transaction = await sequelize.transaction(); // Mulai transaksi

    try {
        const { id } = req.params; // Ambil id dari parameter

        // Cek apakah produk yang akan dihapus ada
        const existingProduct = await Product.findOne({ where: { id } });
        if (!existingProduct) {
            return serverNotFound(res, 'Product not found'); // Mengganti dengan serverNotFound
        }

        // Hapus spesifikasi yang terkait dengan produk
        await ProductSpecification.destroy({
            where: { product_id: id },
            transaction
        });

        // Hapus gambar yang terkait dengan produk
        await ProductImage.destroy({
            where: { product_id: id },
            transaction
        });

        // Hapus produk
        await Product.destroy({
            where: { id },
            transaction
        });

        // Commit transaksi jika semua langkah berhasil
        await transaction.commit();
        return serverSuccess(res, 'Product deleted successfully');
    } catch (error) {
        // Rollback transaksi jika ada error
        await transaction.rollback();
        console.error(error);
        return serverError(res, 'Failed to delete product');
    }
};