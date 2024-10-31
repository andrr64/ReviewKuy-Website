import Category from "../models/category.model.js";
import { serverBadRequest, serverConflict, serverError, serverSuccess, serverCreated, serverNotFound } from "../utility/response_helper.js";

// Fungsi untuk membuat kategori baru
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return serverBadRequest(res, "Name is required");
        }

        const categoryExist = await Category.findOne({ where: { name } });
        if (categoryExist) {
            return serverConflict(res, "Category already exists");
        }

        const newCategory = await Category.create({ name });
        return serverCreated(res, "Category created successfully", newCategory);
    } catch (error) {
        return serverError(res, "Failed to create category");
    }
};

// Fungsi untuk memperbarui kategori
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return serverNotFound(res, "Category not found");
        }

        await category.update({ name });
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
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
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
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (!category) {
            return serverNotFound(res, "Category not found");
        }
        return serverSuccess(res, "Category retrieved successfully", category);
    } catch (error) {
        return serverError(res, "Failed to retrieve data");
    }
};
