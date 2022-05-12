import React from "react";
import StarRatings from "react-star-ratings";

export const showAverage = (item) => {
  if (item?.ratings) {
    const ratingsArray = item && item.ratings;
    const total = [];
    const length = ratingsArray.length;
    // console.log("length", length);

    ratingsArray.map((rating) => total.push(rating.star));

    const totalReduced = total.reduce((previous, next) => previous + next, 0);
    // console.log("totalReduced", totalReduced);

    const highestValue = length * 5;
    // console.log("highestValue", highestValue);

    const result = (totalReduced * 5) / highestValue;
    // console.log("result", result);

    return (
      <div>
        <StarRatings
          starRatedColor="gold"
          rating={result}
          isSelectable={false}
        />
      </div>
    );
  }
};
