import axios from 'axios';
import { ProductModel } from '../model/product';

export const PRODUCT_CONTROLLER_getProducts = async (): Promise<ProductModel[]> => {
    const response = await axios.get('/api/product');
    const products: ProductModel[] = response.data.map((item: any) => {
        return new ProductModel(
            item
        );
    });
    return products;
};

export const PRODUCT_CONTROLLER_getProductById = async (id: number): Promise<ProductModel> => {
    const response = await axios.get(`/api/product/${id}`);
    return new ProductModel(response.data);
}

export const PRODUCT_CONTROLLER_deleteProduct = async (productId: number): Promise<boolean> => {
        return await axios.delete(`/api/admin/feature/product/delete/${productId}`);
};