import axios from 'axios';
import { ProductModel } from '../model/product';

export const PRODUCT_CONTROLLER_getProducts = async (): Promise<ProductModel[]> => {
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


export const PRODUCT_CONTROLLER_deleteProduct = async (productId: number): Promise<boolean> => {
    try {
        // Mengirim permintaan DELETE ke endpoint API dengan ID produk
        const response = await axios.delete(`/api/admin/feature/product/delete/${productId}`);
        if (response.status === 200){
            return true;
        } else {
            throw new Error('Something wrong in the server.');
        }
    } catch (error) {
        console.error(`Failed to delete product with ID ${productId}:`, error);
        throw new Error('Failed to delete product');
    }
};