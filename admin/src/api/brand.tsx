import axios from 'axios';
import { Brand } from '../model/brand';

export const BRAND_CONTROLLER_getBrands = async (): Promise<Brand[]> => {
    const response = await axios.get('/api/brand');
    const brands: Brand[] = response.data.map((item: any) => {
        return new Brand(item);
    });
    return brands;

};

export const BRAND_CONTROLLER_getBrandById = async (brandId: any): Promise<Brand> => {
    return await axios.get(`/api/brand/${brandId}`);
};

export const BRAND_CONTROLLER_updateBrand = async (brandId: any, brandData: Partial<Brand>): Promise<Brand> => {
    return await axios.put(`/api/admin/feature/brand/update/${brandId}`, brandData);
};

export const BRAND_CONTROLLER_deleteBrand = async (brandId: number) => {
    return await axios.delete(`/api/admin/feature/brand/delete/${brandId}`);
};

export const BRAND_CONTROLLER_addBrand = async (data: any) => {
    return await axios.post(`/api/admin/feature/brand/create`, data);
}

export class BrandAPI {
    // Mendapatkan semua brand
    static async getBrands(): Promise<Brand[]> {
        const response = await axios.get('/api/brand');
        const brands: Brand[] = response.data.map((item: any) => new Brand(item));
        return brands;
    }

    // Mendapatkan brand berdasarkan ID
    static async getBrandById(brandId: any): Promise<Brand> {
        const response = await axios.get(`/api/brand/${brandId}`);
        return new Brand(response.data);
    }

    // Mengupdate brand berdasarkan ID dengan data yang diberikan
    static async updateBrand(brandId: any, brandData: Partial<Brand>): Promise<Brand> {
        const response = await axios.put(`/api/admin/feature/brand/update/${brandId}`, brandData);
        return new Brand(response.data);
    }

    // Menghapus brand berdasarkan ID
    static async deleteBrand(brandId: number): Promise<void> {
        return await axios.delete(`/api/admin/feature/brand/delete/${brandId}`);
    }

    // Menambahkan brand baru
    static async addBrand(data: any): Promise<Brand> {
        const response = await axios.post(`/api/admin/feature/brand/create`, data);
        return new Brand(response.data);
    }

    // Mencari brand berdasarkan nama
    static async searchBrand(name: string): Promise<Brand[]> {
        const response = (await axios.post('/api/brand/search', { name })).data;
        return response.map((val: any) => new Brand(val));
    }
}