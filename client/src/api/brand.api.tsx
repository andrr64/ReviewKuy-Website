import axios, { AxiosResponse } from "axios";
import { apiContainer } from "./util";

export class BrandAPI {
    static async getAllBrands(): Promise<AxiosResponse<any>> {
        return apiContainer(() => axios.get('/api/brand')); // Mengirimkan fungsi yang memanggil axios.get
    }

    static async getBrandById(id: any): Promise<AxiosResponse<any>> {
        return apiContainer(() => axios.get(`/api/brand/${id}`)); // Mengirimkan fungsi yang memanggil axios.get dengan parameter id
    }
}
