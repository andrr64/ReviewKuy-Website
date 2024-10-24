import axios from "axios";
import { FieldValues } from "react-hook-form";

export const API_CreateUser = async (data : FieldValues) => {
    const response = await axios.post('http://localhost:3000/api/user/create', data);
    return response.data;
}