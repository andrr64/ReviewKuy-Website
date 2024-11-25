import ReviewStar from '../icons/ReviewStar';
import { MdRateReview } from 'react-icons/md';

interface ReviewSummaryCardProps {
    rating_avg: number;
    review_count: number;
    star_count: number[]; // Indeks mewakili jumlah ulasan per bintang (index + 1 = jumlah bintang)
}

function ReviewSummaryCard({ rating_avg, review_count, star_count }: ReviewSummaryCardProps) {
    // Hitung persentase per bintang
    const ratingPercentages = star_count.map((count, index) => ({
        stars: index + 1,
        count,
        percentage: review_count > 0 ? ((count / review_count) * 100).toFixed(1) : '0.0',
    }));

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold mt-4">Ringkasan Ulasan</h2>
            <div className="w-full border-2 flex shadow py-10 items-center">
                {/* Summary */}
                <div className="flex-none w-80 text-center space-y-2">
                    <p className="text-xl font-bold">Keseluruhan</p>
                    <div className="flex justify-center items-center gap-3">
                        <ReviewStar padding={2} tailwind_text_size={'text-5xl'} />
                        <p className="text-6xl font-semibold">{rating_avg.toFixed(1)}</p>
                    </div>
                    <p className="text-l">{review_count.toLocaleString()} ulasan</p>
                </div>

                {/* Ratings Breakdown */}
                <div className="flex-1 pr-10 space-y-2">
                    {ratingPercentages.map((item) => (
                        <div key={item.stars} className="flex items-center gap-4">
                            <p className="font-bold w-10">{item.stars}★</p>
                            <div className="flex-1 h-4 bg-gray-200 rounded-full">
                                <div
                                    className="h-4 bg-teal-500 rounded-full"
                                    style={{ width: `${item.percentage}%` }}
                                ></div>
                            </div>
                            <p className="w-10 text-right text-sm">{item.percentage}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReviewSummaryCard;