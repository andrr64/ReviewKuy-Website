export class ReviewSummaryModel {

    rating_avg: number;
    review_count: number;
    star_count: any;

    constructor(data: any) {
        this.rating_avg = data.rating_avg;
        this.review_count = data.review_count;
        this.star_count = data.star_count;
    }
}