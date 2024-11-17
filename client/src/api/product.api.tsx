import axios, { AxiosResponse } from "axios";
import { apiContainer } from "./util";

export class ProductAPI {
    static async getProductByBrand(brandId: any): Promise<AxiosResponse<any>> {
        return apiContainer(() => axios.get(`/api/product/brand/${brandId}`))
    }

    static async getProductById(id: any): Promise<AxiosResponse<any>>{
        return apiContainer(() => axios.get(`/api/product/${id}`));
    }
}