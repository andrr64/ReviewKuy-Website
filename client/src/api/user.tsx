import axios from "axios";
import { FieldValues } from "react-hook-form";

export default class UserAPI {
    static async createUser(data: FieldValues) {
        try {
            const response = await axios.post('http://localhost:3000/api/user', data);
            return response.status;
        } catch (error: any) {
            return error.status;
        }
    }
}
