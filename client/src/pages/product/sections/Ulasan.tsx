import { useEffect, useState } from "react";
import { MdRateReview } from "react-icons/md";
import { ReviewModel } from "../../../model/review.model";
import { httpGetOk, httpNotFound } from "../../../api/util";
import { ReviewAPI } from "../../../api/review.api";
import { showAlertByResponseCode } from "../../../util/alert/alert";
import ReviewCard from "../../../components/cards/ReviewCard";
import ReviewStar from "../../../components/icons/ReviewStar";
import TulisReviewModal from "../../../components/modal/ModalTulisReview";
import { ReviewSummaryModel } from "../../../model/review.summary.model";
import ReviewSummaryCard from "../../../components/cards/ReviewSummaryCard";
import UserReviewCard from "../../../components/cards/SelfUserReviewCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

interface ReviewSummaryProp {
  rating: number;
  rating_1star: number;
  rating_2star: number;
  rating_3star: number;
  rating_4star: number;
  rating_5star: number;
}

interface UlasanProps {
  product_id: any;
}

function Ulasan({ product_id }: UlasanProps) {
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [reviewIndex, setReviewIndex] = useState<number>(0);
  const [reviewAmount, setReviewAmount] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(false);
  const [isWriteReview, setWriteReview] = useState<boolean>(false);
  const [userReview, setUserReview] = useState<ReviewModel | null>(null);
  const [reviewSummary, setReviewSummary] = useState<ReviewSummaryModel | null>(null);
  const userData = useSelector((state: RootState) => state.user.data);


  const fetchReviews = async () => {
    const response = await ReviewAPI.getReviews(product_id, reviewIndex, reviewAmount); // TODO: change
    if (httpGetOk(response)) {
      setReviews(response.data);
    } else if (httpNotFound(response)) {
      setReviews([]);
    } else {
      showAlertByResponseCode(response.status);
    }
  }
  const fetchUserReview = async () => {
    const response = await ReviewAPI.getUserReview(product_id);
    if (httpGetOk(response)) {
      const userReview = new ReviewModel(response.data);
      setUserReview(userReview);
    } else {
      setUserReview(null);
    }
  }
  const fetchReviewSummary = async () => {
    const response = await ReviewAPI.getReviewSummary(product_id);
    if (httpGetOk(response)) {
      setReviewSummary(response.data);
    } else {
      setReviewSummary(null);
    }
  }
  const fetchData = async () => {
    setLoading(true);;
    await fetchReviews();
    await fetchUserReview();
    await fetchReviewSummary();
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [userData])

  const renderReviews = () => {
    if (reviews.length !== 0) {
      return (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold mt-4">Ulasan Pengguna Lain</h2>
          {reviews.map((val, index) => {
            return <ReviewCard key={index} data={val} />
          })}
        </div>
      )
    } else {
      return (
        <div className="p-10 border-2 text-primary text-center shadow-sm rounded-lg">
          Belum ada ulasan.
        </div>
      )
    }
  }
  const renderReviewSummary = () => {
    if (reviewSummary !== null) {
      return <ReviewSummaryCard rating_avg={reviewSummary.rating_avg} review_count={reviewSummary.review_count} star_count={reviewSummary.star_count} />
    }
    else {
      return null;
    }
  }
  const renderButtonTulisReview = () => {
    return (
      <button className="bg-blue-700 my-5 hover:bg-blue-800 transition duration-300 text-sm text-white py-2 px-4 rounded-lg " onClick={() => setWriteReview(true)}>
        Tulis Review
      </button>
    )
  }
  const renderOwnReview = () => {
    if (userReview !== null) {
      return <UserReviewCard data={userReview} />
    }
    return renderButtonTulisReview();
  }

  return (
    <>
      <TulisReviewModal productId={product_id} isOpen={isWriteReview} onCreated={(newData) => {
        fetchData();
      }} onClose={() => {
        setWriteReview(false);
      }} />
      <section id="ulasan" className="w-full text-primary space-y-10 mt-10 flex flex-col items-center">
        <div className="w-full max-w-4xl" >
          <div className="flex justify-center gap-2 items-center">
            <MdRateReview className="text-4xl" />
            <h5 className="font-bold text-2xl">Ulasan</h5>
          </div>
          {renderOwnReview()}
          {renderReviewSummary()}
          {renderReviews()}
        </div>
      </section>
    </>
  );
}

export default Ulasan;