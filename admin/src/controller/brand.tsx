import axios from 'axios';
import { Brand } from '../model/brand';

export const BRAND_CONTROLLER_getBrands = async (): Promise<Brand[]> => {
    try {
        // Mengambil data brand dari API
        const response = await axios.get('/api/brand');
        const brands: Brand[] = response.data.map((item: any) => {
            return new Brand(item);
        });
        return brands;
    } catch (error) {
        console.error('Failed to retrieve brands:', error);
        throw new Error('Failed to retrieve brands');
    }
};

export const BRAND_CONTROLLER_getBrandById = async (brandId: number): Promise<Brand> => {
    try {
        // Mengambil data brand berdasarkan ID dari API
        const response = await axios.get(`/api/brand/${brandId}`);

        // Mengonversi data yang diterima menjadi Brand
        return new Brand(response.data);
    } catch (error) {
        console.error(`Failed to retrieve brand with ID ${brandId}:`, error);
        throw new Error('Failed to retrieve brand');
    }
};

export const BRAND_CONTROLLER_updateBrand = async (brandId: number, brandData: Partial<Brand>): Promise<Brand> => {
    try {
        // Mengirim permintaan PUT untuk memperbarui brand
        const response = await axios.put(`/api/admin/feature/brand/update/${brandId}`, brandData);
        
        // Mengonversi data yang diterima menjadi Brand
        return new Brand(response.data);
    } catch (error) {
        console.error(`Failed to update brand with ID ${brandId}:`, error);
        throw new Error('Failed to update brand');
    }
};

export const BRAND_CONTROLLER_deleteBrand = async (brandId: number): Promise<boolean> => {
    try {
        // Mengirim permintaan DELETE ke endpoint API dengan ID brand
        const response = await axios.delete(`/api/admin/feature/brand/delete/${brandId}`);
        if (response.status === 200) {
            return true;
        } else {
            throw new Error('Something wrong in the server.');
        }
    } catch (error) {
        console.error(`Failed to delete brand with ID ${brandId}:`, error);
        throw new Error('Failed to delete brand');
    }
};
