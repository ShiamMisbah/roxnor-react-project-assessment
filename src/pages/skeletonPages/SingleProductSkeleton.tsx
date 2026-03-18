import React from "react";
import { Skeleton } from "antd";
import "./SingleProductSkeleton.scss";

const SingleProductSkeleton = () => {
  return (
    <div className="product-page-skeleton">
      <div className="product-page-skeleton__body">
        <div className="product-page-skeleton__image-section">
          <Skeleton.Image active className="product-page-skeleton__image" />

          <div className="product-page-skeleton__dots">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton.Button
                key={index}
                active
                shape="circle"
                size="small"
                className="product-page-skeleton__dot"
              />
            ))}
          </div>
        </div>

        <div className="product-page-skeleton__details">
          <div className="product-page-skeleton__header">
            <div className="product-page-skeleton__title-wrap">
              <Skeleton.Input
                active
                size="medium"
                className="product-page-skeleton__title"
              />
              <Skeleton.Input
                active
                size="small"
                className="product-page-skeleton__rating"
              />
            </div>

            <Skeleton.Input
              active
              size="small"
              className="product-page-skeleton__category"
            />
          </div>

          <div className="product-page-skeleton__description">
            <Skeleton
              active
              paragraph={{ rows: 3, width: ["100%", "100%", "70%"] }}
              title={false}
            />
          </div>

          <Skeleton.Input
            active
            size="small"
            className="product-page-skeleton__stock"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
