import axios from 'axios';
import { Category } from '../model/category';

export const CATEGORY_CONTROLLER_getCategories = async (): Promise<Category[]> => {
    try {
        // Mengambil data kategori dari API
        const response = await axios.get('/api/category');
        const categories: Category[] = response.data.map((item: any) => {
            return new Category(item);
        });
        return categories;
    } catch (error) {
        console.error('Failed to retrieve categories:', error);
        throw new Error('Failed to retrieve categories');
    }
};

export const CATEGORY_CONTROLLER_getCategoryById = async (categoryId: number): Promise<Category> => {
    try {
        // Mengambil data kategori berdasarkan ID dari API
        const response = await axios.get(`/api/category/${categoryId}`);

        // Mengonversi data yang diterima menjadi Category
        return new Category(response.data);
    } catch (error) {
        console.error(`Failed to retrieve category with ID ${categoryId}:`, error);
        throw new Error('Failed to retrieve category');
    }
};

export const CATEGORY_CONTROLLER_updateCategory = async (categoryId: number, categoryData: Partial<Category>): Promise<Category> => {
    try {
        // Mengirim permintaan PUT untuk memperbarui kategori
        const response = await axios.put(`/api/admin/feature/category/update/${categoryId}`, categoryData);
        
        // Mengonversi data yang diterima menjadi Category
        return new Category(response.data);
    } catch (error) {
        console.error(`Failed to update category with ID ${categoryId}:`, error);
        throw new Error('Failed to update category');
    }
};

export const CATEGORY_CONTROLLER_deleteCategory = async (categoryId: number): Promise<boolean> => {
    try {
        // Mengirim permintaan DELETE ke endpoint API dengan ID kategori
        const response = await axios.delete(`/api/admin/feature/category/delete/${categoryId}`);
        if (response.status === 200) {
            return true;
        } else {
            throw new Error('Something wrong in the server.');
        }
    } catch (error) {
        console.error(`Failed to delete category with ID ${categoryId}:`, error);
        throw new Error('Failed to delete category');
    }
};
