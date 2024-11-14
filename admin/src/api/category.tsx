import axios from 'axios';
import { Category } from '../model/category';
import { toBase64 } from '../util/fileConverter';


export class CategoryAPI {
    // Mengambil semua kategori
    static async getCategories(): Promise<Category[]> {
        try {
            const response = await axios.get('/api/category');
            return response.data.map((item: any) => new Category(item));
        } catch (error) {
            console.error('Failed to retrieve categories:', error);
            throw new Error('Failed to retrieve categories');
        }
    }

    // Mengambil kategori berdasarkan ID
    static async getCategoryById(categoryId: number): Promise<Category> {
        try {
            const response = await axios.get(`/api/category/${categoryId}`);
            return new Category(response.data);
        } catch (error) {
            console.error(`Failed to retrieve category with ID ${categoryId}:`, error);
            throw new Error('Failed to retrieve category');
        }
    }

    // Memperbarui kategori berdasarkan ID
    static async updateCategory(categoryData: Partial<Category>): Promise<Category> {
        try {
            const response = await axios.put(`/api/admin/feature/category/update/${categoryData.id}`, categoryData);
            return new Category(response.data);
        } catch (error) {
            console.error(`Failed to update category with ID ${categoryData.id}:`, error);
            throw new Error('Failed to update category');
        }
    }

    // Menghapus kategori berdasarkan ID
    static async deleteCategory(categoryId: number): Promise<boolean> {
        try {
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
    }

    static async addCategory(name: string, image_file: File): Promise<Category> {
        try {
            const image_base64 = await toBase64(image_file);
            const response = await axios.post('/api/admin/feature/category/create', {name, image_base64});
            if (response.status === 201){
                return new Category(response.data);
            } else {
                throw new Error('Someting wrong');
            }
        } catch (error) {
            throw new Error('Failed to create category');
        }
    }
}
