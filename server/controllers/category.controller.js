import Category from "../models/category.model.js";
import { serverBadRequest, serverConflict, serverError, serverSuccess, serverCreated, serverNotFound } from "../utility/response_helper.js";
import { firebaseApp } from "../index.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Fungsi untuk membuat nama file berdasarkan waktu dengan ketelitian milidetik
const generateFileName = () => {
    const timestamp = Date.now(); // Timestamp dalam milidetik
    return `category_${timestamp}`; // Format nama file
};

// Fungsi upload ke Firebase
const uploadToFirebase = async (base64, fileName) => {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `category.images/${fileName}`);

    // Cek dan potong header base64 jika ada
    const base64Data = base64.split(',')[1];

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

// Fungsi untuk menghapus file dari Firebase jika perlu rollback
const deleteFromFirebase = async (fileUrl) => {
    const storage = getStorage(firebaseApp);
    const fileRef = ref(storage, fileUrl);

    try {
        await deleteObject(fileRef);
        console.log('Rollback: File deleted from Firebase Storage');
    } catch (error) {
        console.error('Rollback failed: Unable to delete file from Firebase Storage', error);
    }
};

// Fungsi untuk membuat kategori baru dengan rollback jika upload gagal
export const createCategory = async (req, res) => {
    try {
        const { name, image_base64 } = req.body;
        if (!name) {
            return serverBadRequest(res, "Name is required");
        }

        const categoryExist = await Category.findOne({ where: { name } });
        if (categoryExist) {
            return serverConflict(res, "Category already exists");
        }

        // Generate file name berdasarkan waktu dengan ketelitian milidetik
        const fileName = generateFileName();
        let imageUrl;
        try {
            imageUrl = await uploadToFirebase(image_base64, fileName);
        } catch (error) {
            return serverError(res, "Image upload failed, category not created");
        }

        // Jika upload berhasil, lanjutkan membuat kategori di database
        const newCategory = await Category.create({ name, image_url: imageUrl });
        return res.status(201).json(newCategory);
    } catch (error) {
        // Rollback jika terjadi kesalahan saat menyimpan kategori di database
        if (imageUrl) {
            await deleteFromFirebase(imageUrl);
        }
        return serverError(res, "Failed to create category with image");
    }
};


// Fungsi untuk memperbarui kategori
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image_url } = req.body;  // Tambahkan image_url pada request body

        const category = await Category.findByPk(id);
        if (!category) {
            return serverNotFound(res, "Category not found");
        }

        // Update nama dan image_url kategori
        await category.update({ name, image_url });

        return serverSuccess(res, "Category updated successfully", category);
    } catch (error) {
        return serverError(res, "Failed to update category");
    }
};


// Fungsi untuk menghapus kategori
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        if (!category) {
            return serverNotFound(res, "Category not found");
        }

        // Hapus gambar dari Firebase Storage jika ada image_url
        if (category.image_url) {
            await deleteFromFirebase(category.image_url);
        }

        await category.destroy();
        return serverSuccess(res, "Category deleted successfully");
    } catch (error) {
        return serverError(res, "Failed to delete category");
    }
};


// Fungsi untuk mendapatkan semua kategori
export const getCategory = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'name', 'image_url'],  // Pastikan image_url ada dalam atribut yang dikembalikan
        });
        return res.status(200).send(categories);
    } catch (error) {
        console.error(error);
        return serverError(res, "Failed to retrieve data");
    }
};


// Fungsi untuk mendapatkan kategori berdasarkan ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id, {
            attributes: ['id', 'name', 'image_url'],  // Pastikan image_url ada dalam atribut yang dikembalikan
        });
        if (!category) {
            return serverNotFound(res, "Category not found");
        }
        return serverSuccess(res, "Category retrieved successfully", category);
    } catch (error) {
        return serverError(res, "Failed to retrieve data");
    }
};