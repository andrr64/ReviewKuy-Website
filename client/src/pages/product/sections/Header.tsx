import { useNavigate } from "react-router-dom"
import { ProductModel } from "../../../model/product.model"
import { routes } from "../../../route";
import { ReviewSummaryModel } from "../../../model/review.summary.model";

interface HeaderProps {
  product: ProductModel;
  review_summary?: ReviewSummaryModel;
}
import React, { useEffect, useState } from 'react';
import { ReviewAPI } from "../../../api/review.api";
import { httpGetOk } from "../../../api/util";
import { formatToIDR } from "../../utility";

interface Props {
  rating_avg: number;
  jumlah_ulasan: number;
  rating: number[]; // Array dengan panjang 5, misalnya [2, 3, 4, 5, 6]
}

const ReviewSummary: React.FC<Props> = ({ rating_avg, jumlah_ulasan, rating }) => {
  // Total ulasan untuk menghitung persentase
  const totalUlasan = rating.reduce((acc, curr) => acc + curr, 0);

  // Helper untuk menghitung persentase
  const getPercentage = (count: number) => ((count / totalUlasan) * 100).toFixed(0);

  return (
    <div className="p-4 border rounded-md shadow-md w-full max-w-lg">
      {/* Bagian atas: Rating rata-rata dan jumlah ulasan */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">
            Reviews <span className="text-green-600">{rating_avg.toFixed(1)}</span>
          </h2>
          <p className="text-sm text-gray-500">{jumlah_ulasan.toLocaleString()} ulasan</p>
        </div>
      </div>

      {/* Bar untuk setiap rating */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star, index) => (
          <div key={star} className="flex items-center">
            {/* Bintang dan angkanya */}
            <span className="flex items-center justify-center w-8 text-gray-600 font-medium">
              {star} <span className="text-green-600 ml-1">★</span>
            </span>

            {/* Bar rating */}
            <div className="flex-1 h-4 bg-gray-200 rounded-md overflow-hidden mx-2">
              <div
                className="h-full bg-green-600"
                style={{ width: `${getPercentage(rating[star - 1])}%` }}
              ></div>
            </div>

            {/* Persentase */}
            <span className="w-12 text-right text-gray-600 text-sm">
              {getPercentage(rating[star - 1])}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

function Header({ product }: HeaderProps) {
  const navigate = useNavigate();
  const [reviewSummary, setReviewSummary] = useState<ReviewSummaryModel | null>(null);

  const fetchReviewSummary = async () => {
    const response = await ReviewAPI.getReviewSummary(product.id);
    if (httpGetOk(response)) {
      setReviewSummary(new ReviewSummaryModel(response.data));
    } else {
      setReviewSummary(new ReviewSummaryModel({
        rating_avg: 0,
        review_count: 0,
        star_count: [0, 0, 0, 0, 0]
      }))
    }
  }

  useEffect(() => {
    fetchReviewSummary();
  }, [])


  return (
    <section id="header" className="flex text-primary gap-4">
      <img width={256} src={product.pictures[0].imageUrl} alt="" />

      <div
        onClick={() => navigate(routes.get.productBy.brand(product.brand.id))}
        className="flex flex-col justify-center w-1/4 gap-2 cursor-pointer"
      >
        <div className="flex gap-1 items-center">
          <img className="h-5" src={product.brand.logo_url} alt="" />
          <p>{product.brand.name}</p>
        </div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <h2 className="text-xl">{formatToIDR(product.price)}</h2>
      </div>

      {reviewSummary !== null && (
        <ReviewSummary
          rating_avg={reviewSummary.rating_avg}
          jumlah_ulasan={reviewSummary.review_count}
          rating={reviewSummary.star_count} />
      )}
    </section>
  )
}

export default Header