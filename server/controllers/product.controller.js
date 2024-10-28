import { serverBadRequest, serverConflict, serverCreated, serverError, serverSuccess, serverNotFound } from "../utility/response_helper.js";
import sequelize from '../db.js';
import Product from "../models/product.model.js";
import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import ProductSpecification from "../models/product.specification.model.js";
import ProductImage from "../models/product.images.model.js";

export const createProduct = async (req, res) => {
    const transaction = await sequelize.transaction(); // Mulai transaksi

    try {
        const { name, description, brand_id, category_id, specification_data, picture_data } = req.body;

        // Validasi input: Pastikan semua field yang diperlukan diisi
        if (!name || !brand_id || !category_id || !specification_data || !picture_data) {
            return serverBadRequest(res, 'All fields are required.');
        }

        // Cek apakah produk dengan nama yang sama sudah ada
        const existingProduct = await Product.findOne({ where: { name, brand_id }, transaction });
        if (existingProduct) {
            return serverConflict(res, 'Product already exists');
        }

        // Buat produk baru
        const newProduct = await Product.create({
            name,
            description,
            brand_id,
            category_id
        }, { transaction });

        // Simpan `specification_data`
        for (const spec of specification_data) {
            await ProductSpecification.create({
                product_id: newProduct.id,
                ...spec
            }, { transaction });
        }

        // Simpan `picture_data`
        for (const pict of picture_data) {
            await ProductImage.create({
                product_id: newProduct.id,
                index: pict.index, // Pastikan index ada dalam `pict`
                image_url: pict.image_url // Simpan URL gambar
            }, { transaction });
        }

        // Commit transaksi jika semua langkah berhasil
        await transaction.commit();
        return serverCreated(res, 'Product created successfully', newProduct);

    } catch (error) {
        // Rollback transaksi jika ada error
        await transaction.rollback();
        console.error(error);
        return serverError(res, 'Failed to create product');
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        // Mengambil spesifikasi, gambar, brand, dan category untuk setiap produk
        const formattedProducts = await Promise.all(products.map(async (product) => {
            const specifications = await ProductSpecification.findAll({
                where: { product_id: product.id },
            });

            const pictures = await ProductImage.findAll({
                where: { product_id: product.id },
            });

            // Ambil data brand dan category secara manual
            const brand = await Brand.findOne({ where: { id: product.brand_id}, attributes: { exclude: ['createdAt', 'updatedAt'] }});;
            const category = await Category.findOne({ where: { id: product.category_id }, attributes: { exclude: ['createdAt', 'updatedAt'] }});

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
            return serverNotFound(res, 'Product not found'); // Mengganti dengan serverNotFound
        }

        const specifications = await ProductSpecification.findAll({
            where: { product_id: product.id },
        });

        const pictures = await ProductImage.findAll({
            where: { product_id: product.id },
        });

        // Ambil data brand dan category secara manual dengan kondisi yang benar
        const brand = await Brand.findOne({ where: { id: product.brand_id },  attributes: { exclude: ['createdAt', 'updatedAt'] }});
        const category = await Category.findOne({ where: { id: product.category_id },  attributes: { exclude: ['createdAt', 'updatedAt'] }});

        const formattedProduct = {
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

        return res.json(formattedProduct);
    } catch (error) {
        console.error(error);
        return serverError(res, 'Failed to retrieve product');
    }
};

export const updateProduct = async (req, res) => {
    const transaction = await sequelize.transaction(); // Mulai transaksi

    try {
        const { id } = req.params; // Ambil id dari parameter
        const { name, description, brand_id, category_id, specification_data, picture_data } = req.body;

        // Validasi input: Pastikan setidaknya satu field diisi untuk diperbarui
        if (!name && !description && !brand_id && !category_id && !specification_data && !picture_data) {
            return serverBadRequest(res, 'At least one field is required to update.');
        }

        // Cek apakah produk yang akan diperbarui ada
        const existingProduct = await Product.findOne({ where: { id } });
        if (!existingProduct) {
            return serverNotFound(res, 'Product not found'); // Mengganti dengan serverNotFound
        }

        // Update produk
        await Product.update({
            name,
            description,
            brand_id,
            category_id
        }, {
            where: { id },
            transaction
        });

        // Hapus spesifikasi yang ada (opsional, tergantung pada kebutuhan Anda)
        await ProductSpecification.destroy({
            where: { product_id: id },
            transaction
        });

        // Simpan `specification_data` yang baru
        if (specification_data) {
            for (const spec of specification_data) {
                await ProductSpecification.create({
                    product_id: id,
                    ...spec
                }, { transaction });
            }
        }

        // Hapus gambar yang ada (opsional, tergantung pada kebutuhan Anda)
        await ProductImage.destroy({
            where: { product_id: id },
            transaction
        });

        // Simpan `picture_data` yang baru
        if (picture_data) {
            for (const pict of picture_data) {
                await ProductImage.create({
                    product_id: id,
                    index: pict.index, // Pastikan index ada dalam `pict`
                    image_url: pict.image_url // Ambil URL gambar dari properti image_url
                }, { transaction });
            }
        }

        // Commit transaksi jika semua langkah berhasil
        await transaction.commit();
        return serverSuccess(res, 'Product updated successfully');
    } catch (error) {
        // Rollback transaksi jika ada error
        await transaction.rollback();
        console.error(error);
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