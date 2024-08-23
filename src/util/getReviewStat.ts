import { ReviewInfo, ReviewStat } from "@/constants/types";

export default function getReviewStat(reviewList: ReviewInfo[]) {
  const reviewStat: ReviewStat = {
    total: 0,
    average: 0,
    groupList: [
      { score: 5, count: 0 },
      { score: 4, count: 0 },
      { score: 3, count: 0 },
      { score: 2, count: 0 },
      { score: 1, count: 0 },
    ],
  };

  let sum = 0;

  reviewList.map((reviewInfo) => {
    reviewStat.groupList[5 - reviewInfo.score].count += 1;
    sum += reviewInfo.score;
  });

  reviewStat.average = reviewList.length === 0 ? 0 : sum / reviewList.length;

  reviewStat.total = reviewList.length;

  return reviewStat;
}
