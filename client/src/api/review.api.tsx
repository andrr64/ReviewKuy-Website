import axios from "axios";
import { apiContainer } from "./util";

export class ReviewAPI {
    static async getReviews(product_id: any, index: any, amount: any) {
        return apiContainer(() => axios.get(`/api/review/get/${product_id}/${index}/${amount}`))
    }
    
    static async getReviewSummary(product_id: any){
        return apiContainer(() => axios.get(`/api/review/get/summary/${product_id}`))
    }

    static async getUserReview(product_id: any) {
        return apiContainer(() => axios.get(`/api/user/feature/review/get/${product_id}`));
    }

    static async createReview(product_id: any, title: string, review: string, rating: number) {
        return apiContainer(() => axios.post(`/api/user/feature/review/create/${product_id}`, {
            title,
            review,
            rating
        }, {
            withCredentials: true // Mengirimkan cookies
        }));
    }
}