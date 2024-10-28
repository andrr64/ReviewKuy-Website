import Category from "../models/category.model.js";
import { serverBadRequest, serverConflict, serverError, serverSuccess, serverCreated, serverNotFound } from "../utility/response_helper.js";

// Fungsi untuk membuat kategori baru
export const createCategory = async (req, res) => {
    try {
        const { name }= req.body;
        if (!name ) {
            return serverBadRequest(res, "Name diperlukan");
        }

        const categoryExist = await Category.findOne({ where: { name } });
        if (categoryExist) {
            return serverConflict(res, "Kategori sudah ada");
        }

        const newCategory = await Category.create({ name });
        return serverCreated(res, "Kategori berhasil dibuat", newCategory);
    } catch (error) {
        return serverError(res, "Gagal membuat kategori");
    }
};

// Fungsi untuk memperbarui kategori
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return serverNotFound(res, "Kategori tidak ditemukan");
        }

        await category.update({ name });
        return serverSuccess(res, "Kategori berhasil diperbarui", category);
    } catch (error) {
        return serverError(res, "Gagal memperbarui kategori");
    }
};

// Fungsi untuk menghapus kategori
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        if (!category) {
            return serverNotFound(res, "Kategori tidak ditemukan");
        }

        await category.destroy();
        return serverSuccess(res, "Kategori berhasil dihapus");
    } catch (error) {
        return serverError(res, "Gagal menghapus kategori");
    }
};

// Fungsi untuk mendapatkan semua kategori
export const getCategory = async (req, res) => {
    try {
        const categories = await Category.findAll({
            attributes: ['id', 'name'] // Hanya ambil kolom 'id' dan 'name'
        });
        
        return serverSuccess(res, "Categories retrieved successfully", categories);
    } catch (error) {
        console.error(error);
        return serverError(res, "Failed to retrieve categories");
    }
};


// Fungsi untuk mendapatkan kategori berdasarkan ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);
        if (!category) {
            return serverNotFound(res, "Kategori tidak ditemukan");
        }

        return serverSuccess(res, "Data kategori ditemukan", category);
    } catch (error) {
        return serverError(res, "Gagal mendapatkan data kategori");
    }
};
    