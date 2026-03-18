import React from "react";
import "./RatingComponent.scss";

type StarRatingProps = {
  rating: number; // 0 to 5
  size?: number;
};

const RatingComponent = ({ rating, size = 16 }: StarRatingProps) => {
  const safeRating = Math.max(0, Math.min(5, rating));

  return (
    <div className="rating-component">
      <h2 className="rating-component__label">Rating</h2>

      <div className="rating-component__stars">
        {[0, 1, 2, 3, 4].map((starIndex) => {
          const fillPercent = Math.max(
            0,
            Math.min(100, (safeRating - starIndex) * 100),
          );

          return (
            <div
              key={starIndex}
              className="rating-component__star"
              style={{ width: `${size}px`, height: `${size}px` }}
            >
              <StarIcon size={size} color="#d9d9d9" />
              <div
                className="rating-component__star-fill"
                style={{ width: `${fillPercent}%` }}
              >
                <StarIcon size={size} color="#fadb14" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type StarIconProps = {
  size: number;
  color: string;
};

const StarIcon = ({ size, color }: StarIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.56L12 17.77 6.12 20.62l1.12-6.56-4.76-4.64 6.58-.96L12 2.5z" />
  </svg>
);

export default RatingComponent;
