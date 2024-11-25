import { ReviewModel } from "../../model/review.model";
import ReviewStar from "../icons/ReviewStar";

interface ReviewCardProps {
    data: ReviewModel;
}

function ReviewCard({ data }: ReviewCardProps) {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= data.rating; i++) {
            stars.push(
                <ReviewStar key={i} padding={2} tailwind_text_size={'text-l'}/>
            );
        }
        for (let i = 1; i <= 5 - data.rating; i++) {
            stars.push(
                <ReviewStar key={i} padding={2} filled={false} tailwind_text_size={'text-l'}/>
            );
        }
        return <div className="flex space-x-1">{stars}</div>;
    };

    return (
        <div className="space-y-4 p-10 border-2 text-primary shadow-sm rounded-lg">
            <div className="flex space-x-2 items-center">
                <img className="h-12 w-12 rounded-full" src={data.user.avatar} alt="User avatar" />
                <h2 className="font-bold text-xl">{data.user.name}</h2>
            </div>
            <div>{renderStars()}</div>
            <div>
                <p className="font-semibold">{data.title}</p>
                <p>{data.review}</p>
            </div>
        </div>
    );
}

export default ReviewCard;
