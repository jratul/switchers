import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import Rating from "@/components/Rating";
import { ReviewInfo } from "@/constants/types";
import ReviewItem from "../../../components/ReviewItem";

const reviews = {
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
};

export default function Review({ gameId }: { gameId: string }) {
  const [reviewList, setReviewList] = useState<ReviewInfo[]>([]);

  useEffect(() => {
    if (!gameId) {
      return;
    }

    fetch(`/api/reviews/game/${gameId}`)
      .then((res) => {
        if (!res.ok) {
          console.log("not ok");
          return [];
        }

        return res.json();
      })
      .then((reviewList) => {
        console.log("reviewList:", reviewList);
        setReviewList(reviewList);
      })
      .catch(() => {});
  }, [gameId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div className="col-span-1 flex flex-col gap-2 p-3">
        <div className="text-2xl font-bold">구매 고객 리뷰</div>
        <div className="flex items-center gap-2">
          <Rating rating={4.5} />
          <div>4.5</div>
          <div className="text-gray-500">13개의 리뷰</div>
        </div>
        <div className="grid gap-1">
          {reviews.counts.map((count) => (
            <div key={count.rating} className="flex items-center text-sm">
              <dt className="flex flex-1 items-center">
                <p className="w-3 font-medium text-gray-900">
                  {count.rating}
                  <span className="sr-only"> star reviews</span>
                </p>
                <div
                  aria-hidden="true"
                  className="ml-1 flex flex-1 items-center"
                >
                  <StarIcon
                    aria-hidden="true"
                    className={clsx(
                      count.count > 0 ? "text-yellow-400" : "text-gray-300",
                      "h-5 w-5 flex-shrink-0"
                    )}
                  />
                  <div className="relative ml-3 flex-1">
                    <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                    {count.count > 0 ? (
                      <div
                        style={{
                          width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                        }}
                        className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                      />
                    ) : null}
                  </div>
                </div>
              </dt>
              <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                {Math.round((count.count / reviews.totalCount) * 100)}%
              </dd>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2 p-3">
        {reviewList.map((reviewInfo) => (
          <ReviewItem reviewInfo={reviewInfo} key={reviewInfo._id.toString()} />
        ))}
      </div>
    </div>
  );
}
