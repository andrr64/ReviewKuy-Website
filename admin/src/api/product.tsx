import axios from 'axios';
import { ProductModel } from '../model/product';

export class ProductAPI {
    // Mengambil semua produk
    static async getProducts(): Promise<ProductModel[]> {
        const response = await axios.get('/api/product');
        return response.data.map((item: any) => new ProductModel(item));
    }

    // Mengambil produk berdasarkan ID
    static async getProductById(id: number): Promise<ProductModel> {
        const response = await axios.get(`/api/product/${id}`);
        return new ProductModel(response.data);
    }

    // Menghapus produk berdasarkan ID
    static async deleteProduct(productId: number): Promise<boolean> {
        try {
            const response = await axios.delete(`/api/admin/feature/product/delete/${productId}`);
            return response.status === 200;
        } catch (error) {
            console.error(`Failed to delete product with ID ${productId}:`, error);
            throw new Error('Failed to delete product');
        }
    }
}
