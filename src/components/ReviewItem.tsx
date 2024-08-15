import Rating from "@/components/Rating";
import { ReviewInfo } from "@/constants/types";
import { format } from "date-fns";
import Divider from "./Divider";

export default function ReviewItem({ reviewInfo }: { reviewInfo: ReviewInfo }) {
  return (
    <div>
      <div className="text-xl font-bold mb-1">{reviewInfo?.userName}</div>
      <div className="mb-1">
        <Rating rating={reviewInfo?.score ?? 0} />
      </div>
      <div className="text-sm text-gray-500">
        {reviewInfo?.date && format(reviewInfo.date, "yyyy년 MM월 dd일")}
      </div>
      <div>{reviewInfo?.content}</div>
      <Divider />
    </div>
  );
}
