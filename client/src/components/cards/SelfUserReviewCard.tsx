import { useSelector } from "react-redux";
import { ReviewModel } from "../../model/review.model"
import ReviewCard from "./ReviewCard";
import { RootState } from "../../state/store";

interface OwnReviewCardProp {
  data: ReviewModel;
}

function UserReviewCard({ data }: OwnReviewCardProp) {
  const userData = useSelector((state: RootState) => state.user.data);

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mt-4">Ulasan Kamu</h2>
      <div>
        <button>Ubah</button>
        <button>Hapus</button>
      </div>
      <ReviewCard data={data} />
    </div>
  )
}

export default UserReviewCard