import axios, { AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";

export default class UserAPI {
    static async createUser(data: FieldValues): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.post('http://localhost:3000/api/user', data);
            return response;
        } catch (error: any) {
            return error; // Mengembalikan status error jika ada, atau 500 jika tidak
        }
    }

    static async login(data: FieldValues): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', data);
            return response;
        } catch (error: any) {
            return error;
        }
    }
}
