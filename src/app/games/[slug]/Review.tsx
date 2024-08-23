import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

import Rating from "@/components/Rating";
import { ReviewInfo, ReviewStat } from "@/constants/types";
import ReviewItem from "../../../components/ReviewItem";

export default function Review({ gameId }: { gameId: string }) {
  const [reviewList, setReviewList] = useState<ReviewInfo[]>([]);
  const [reviewStat, setReviewStat] = useState<ReviewStat>({
    total: 0,
    average: 0,
    groupList: [
      { score: 5, count: 0 },
      { score: 4, count: 0 },
      { score: 3, count: 0 },
      { score: 2, count: 0 },
      { score: 1, count: 0 },
    ],
  });

  useEffect(() => {
    if (!gameId) {
      return;
    }

    fetch(`/api/reviews/game/${gameId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then((reviewData) => {
        setReviewList(reviewData.reviewList);
        setReviewStat(reviewData.reviewStat);
      })
      .catch(() => {});
  }, [gameId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div className="col-span-1 flex flex-col gap-2 p-3">
        <div className="text-2xl font-bold">구매 고객 리뷰</div>
        <div className="flex items-center gap-2">
          <Rating rating={reviewStat.average} />
          <div>{reviewStat.average.toPrecision(2)}</div>
          <div className="text-gray-500">{reviewList.length}개의 리뷰</div>
        </div>
        <div className="grid gap-1">
          {reviewStat.groupList.map((groupItem) => (
            <div key={groupItem.score} className="flex items-center text-sm">
              <dt className="flex flex-1 items-center">
                <p className="w-3 font-medium text-gray-900">
                  {groupItem.score}
                </p>
                <div
                  aria-hidden="true"
                  className="ml-1 flex flex-1 items-center"
                >
                  <StarIcon
                    aria-hidden="true"
                    className={clsx(
                      groupItem.count > 0 ? "text-yellow-400" : "text-gray-300",
                      "h-5 w-5 flex-shrink-0"
                    )}
                  />
                  <div className="relative ml-3 flex-1">
                    <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                    {groupItem.count > 0 ? (
                      <div
                        style={{
                          width: `calc(${groupItem.count} / ${reviewStat.total} * 100%)`,
                        }}
                        className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                      />
                    ) : null}
                  </div>
                </div>
              </dt>
              <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                {reviewStat.total === 0
                  ? 0
                  : Math.round((groupItem.count / reviewStat.total) * 100)}
                %
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
