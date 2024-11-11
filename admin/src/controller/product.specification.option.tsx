import axios from 'axios';
import { ProductSpecificationOption } from '../model/product.specification.option';

export const PRODUCT_SPEC_OPT_CONTROLLER_getOptions = async() => {
    try {
        // Mengambil data kategori dari API
        const response = await axios.get('/api/product/specification/option');
        const options: ProductSpecificationOption[] = response.data.map((item: any) => {
            return new ProductSpecificationOption(item);
        });
        return options;
    } catch (error) {
        console.error('Failed to retrieve spec. option:', error);
        throw new Error('Failed to retrieve spec. option');
    }
}

export const PRODUCT_SPEC_OPT_CONTROLLER_addData= async(name: string) => {
    try {
        const response = await axios.post('/api/admin/feature/product/specification/option/create', {
            name
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export const PRODUCT_SPEC_OPT_CONTROLLER_deleteData= async(id: any) => {
    try {
        const response = await axios.delete(`/api/admin/feature/product/specification/option/delete/${id}`);
        if (response.status === 200){
            return true;
        } return false;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}

export const PRODUCT_SPEC_OPT_CONTROLLER_updateData = async(data: any) => {
    try {
        const response = await axios.post('/api/admin/feature/product/specification/option/update', data);
        if (response.status !== 200){
            throw new Error('')
        }
    } catch (error: any) {
        throw new Error(error);
    }
}