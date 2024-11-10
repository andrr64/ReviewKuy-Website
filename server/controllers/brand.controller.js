import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"; 
import Brand from "../models/brand.model.js";
import { serverBadRequest, serverCreated, serverError, serverSuccess } from "../utility/response_helper.js";
import { firebaseApp } from "../index.js";
// Fungsi untuk meng-upload file yang di-decode dari base64 ke Firebase
const uploadToFirebase = async (base64, fileName) => {
    const storage = getStorage(firebaseApp); 
    const storageRef = ref(storage, `brand.logos/${fileName}`);

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

export const createBrand = async (req, res) => {
    const { name, description, logo } = req.body;

    // Validasi input
    if (!name || !description || !logo) {
        return serverBadRequest(res, 'All fields are required.');
    }
    if (name.length > 255){
        return serverBadRequest(res, 'Max description char is 255');
    }
    
    try {
        // Mendapatkan nama file dari logo
        const fileName = `${name}_logo`; // Misalnya mengganti spasi dengan underscore

        // Upload logo ke Firebase dan ambil URL-nya
        const logoUrl = await uploadToFirebase(logo, fileName);

        // Buat brand baru dengan URL logo
        const newBrand = await Brand.create({
            name,
            description,
            logo_url: logoUrl, // Gunakan URL logo yang diunggah
        });
        // Kirim response
        return serverCreated(res, 'Brand created successfully', newBrand);
    } catch (error) {
        console.error(error);
        return serverError(res, error.message);
    }
};

export const updateBrand = async (req, res) => {
    const { id } = req.params; // Mengambil ID brand dari parameter URL
    const { name, description, new_logo } = req.body;

    // Validasi input
    if (!name && !description && !new_logo) {
        return serverBadRequest(res, 'At least one field is required to update.');
    }

    try {
        // Mencari brand berdasarkan ID
        const brand = await Brand.findByPk(id);

        if (!brand) {
            return serverBadRequest(res, 'Brand not found.');
        }

        // Mendapatkan referensi storage
        const storage = getStorage(firebaseApp);

        // Jika ada logo baru
        if (new_logo) {
            // Hapus logo lama dari Firebase Storage jika ada
            if (brand.logo_url) {
                const oldLogoRef = ref(storage, brand.logo_url);
                await deleteObject(oldLogoRef);
            }

            // Upload logo baru dan ambil URL-nya
            const fileName = `${brand.name}_logo`; // Atur nama file baru
            const logoUrl = await uploadToFirebase(new_logo, fileName);

            // Memperbarui brand dengan logo baru
            await brand.update({
                name: name || brand.name, // Hanya memperbarui jika field tidak kosong
                description: description || brand.description,
                logo_url: logoUrl, // Gunakan URL logo baru
            });
        } else {
            // Memperbarui brand tanpa mengubah logo
            await brand.update({
                name: name || brand.name,
                description: description || brand.description,
                logo_url: brand.logo_url, // Tetap gunakan logo yang lama
            });
        }

        return res.status(200).send(brand);
    } catch (error) {
        return serverError(res, error.message);
    }
};

export const deleteBrandById = async (req, res) => {
    const { id } = req.params; // Mengambil ID brand dari parameter URL
    console.log(req);
    
    try {
        // Mencari brand berdasarkan ID
        const brand = await Brand.findByPk(id);

        if (!brand) {
            return serverBadRequest(res, 'Brand not found.');
        }

        // Menghapus brand
        await brand.destroy();

        return serverSuccess(res, 'Brand deleted successfully', {});
    } catch (error) {
        return serverError(res, error.message);
    }
};

export const getBrands = async (req, res) => {
    try {
        // Mengambil semua brand dari database
        const brands = await Brand.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        
        // Mengembalikan response dengan daftar brand
        return res.status(200).send(brands);

    } catch (error) {
        return serverError(res, error.message);
    }
};

export const getBrandById = async (req, res) => {
    const { id } = req.params; // Mengambil ID brand dari parameter URL

    try {
        // Mencari brand berdasarkan ID
        const brand = await Brand.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        if (!brand) {
            return serverBadRequest(res, 'Brand not found.');
        }
        return res.status(200).send(brand);
    } catch (error) {
        return serverError(res, error.message);
    }
};
