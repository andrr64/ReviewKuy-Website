import axios from "axios";
import { FieldValues } from "react-hook-form";

export const USER_CTRL_CreateUser = async (data : FieldValues) => {
    const response = await axios.post('/api/user', data);
    return response.data;
}