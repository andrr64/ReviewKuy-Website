import axios, { AxiosResponse } from "axios";
import { apiContainer } from "./util";

export class CategoryAPI {
    static async  getCategories(): Promise<AxiosResponse<any>> {
        return apiContainer(() => axios.get('/api/category'));
    }
}