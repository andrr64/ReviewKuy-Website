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