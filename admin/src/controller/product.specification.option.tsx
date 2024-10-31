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