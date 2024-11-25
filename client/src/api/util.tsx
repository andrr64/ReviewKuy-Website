import { AxiosResponse } from "axios";

export const apiContainer = async (todo: any) => {
    try {
        const response = await todo(); // Menjalankan fungsi yang diberikan
        return response;
    } catch (error: any) {
        return error; // Mengembalikan status error jika ada, atau 500 jika tidak
    }
}

export const httpGetOk = (res: AxiosResponse) => {
    return res.status === 200;
}

export const httpCreateOk = (res: AxiosResponse) => {
    return res.status === 201;
}

export const httpNotFound = (res: AxiosResponse) => {
    return res.status === 404;
}

export const httpNotAuthorized = (res: AxiosResponse) => {
    return res.status === 401;
}