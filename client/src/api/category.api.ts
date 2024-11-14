import axios, { AxiosResponse } from "axios";

export class CategoryAPI {
    static async  getCategories(): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.get('/api/category');
            return response;
        } catch (error: any) {
            return error;
        }
    }
}