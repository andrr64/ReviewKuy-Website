import axios from 'axios';
import { ProductSpecificationOption } from '../model/product.specification.option';

export class SpecificationOptAPI {
    // Mengambil semua opsi spesifikasi produk
    static async getOptions(): Promise<ProductSpecificationOption[]> {
        try {
            const response = await axios.get('/api/product/specification/option');
            return response.data.map((item: any) => new ProductSpecificationOption(item));
        } catch (error) {
            console.error('Failed to retrieve spec. option:', error);
            throw new Error('Failed to retrieve spec. option');
        }
    }

    // Menambahkan opsi spesifikasi produk baru
    static async addData(name: string): Promise<any> {
        try {
            const response = await axios.post('/api/admin/feature/product/specification/option/create', { name });
            return response.data;
        } catch (error: any) {
            console.error('Failed to add spec. option:', error);
            throw new Error(error.response?.data?.message || 'Failed to add spec. option');
        }
    }

    // Menghapus opsi spesifikasi produk berdasarkan ID
    static async deleteData(id: any): Promise<boolean> {
        try {
            const response = await axios.delete(`/api/admin/feature/product/specification/option/delete/${id}`);
            return response.status === 200;
        } catch (error: any) {
            console.error('Failed to delete spec. option:', error);
            throw new Error(error.response?.data?.message || 'Failed to delete spec. option');
        }
    }

    // Memperbarui data opsi spesifikasi produk
    static async updateData(data: any): Promise<void> {
        try {
            const response = await axios.post('/api/admin/feature/product/specification/option/update', data);
            if (response.status !== 200) {
                throw new Error('Failed to update spec. option');
            }
        } catch (error: any) {
            console.error('Failed to update spec. option:', error);
            throw new Error(error.response?.data?.message || 'Failed to update spec. option');
        }
    }
}
