import { UserModel } from "./user.model";

export class ReviewModel {
    product_id: number;
    title: string;
    rating: number;
    date: string;
    review: string;
    user: UserModel;

    constructor(data: any){
        this.product_id = data.product_id;
        this.user = data.user;
        this.title = data.title;
        this.rating = data.rating;
        this.review = data.review;
        this.date = data.review;
    }
}