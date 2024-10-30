import axios from 'axios';
import { ProductModel } from '../model/product';

export const getProducts = async (): Promise<ProductModel[]> => {
    try {
        // Mengambil data produk dari API
        const response = await axios.get('/api/product');

        // Mengonversi data yang diterima menjadi array of Product
        const products: ProductModel[] = response.data.map((item: any) => {
            return new ProductModel(
                item
            );
        });
        return products;
    } catch (error) {
        console.error('Failed to retrieve products:', error);
        throw new Error('Failed to retrieve products');
    }
};
