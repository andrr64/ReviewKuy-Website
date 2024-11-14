import axios, { AxiosResponse } from "axios";

export class BrandAPI {
    static async getAllBrands(): Promise<AxiosResponse<any>>{
        try {
            const response = await axios.get('/api/brand');
            return response;
        } catch (error: any) {
            return error; // Mengembalikan status error jika ada, atau 500 jika tidak
        }
    }
}