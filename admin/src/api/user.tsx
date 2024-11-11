import axios from "axios";

export class UserAPI {
    static async search(name: string){
        try {
            const response = await axios.post('/api/admin/feature/user/search', {
                name
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async getTotalUser(){
        return (await axios.get('/api/admin/feature/user/total')).data;
    }
}