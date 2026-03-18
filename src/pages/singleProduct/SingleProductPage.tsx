import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductsQuery } from "../../state/product/productApiSlice";
import Error404Page from "../errorPage/Error404Page";
import './SingleProductPage.scss'
import { Carousel } from "antd";
import RatingComponent from "../../components/ratingComponent/RatingComponent";

type Props = {};

const SingleProductPage = (props: Props) => {
  const { id } = useParams<{ id: string }>();

  const numericId = Number(id);
  const hasId = typeof id === "string" && id.trim() !== "";
  const isValidId = hasId && Number.isInteger(numericId) && numericId > 0;

  const { data, isLoading, isError, error } = useGetSingleProductsQuery(
    { id: numericId },
    { skip: !isValidId },
  );

  if (!id)
    return (
      <div>
        <Error404Page />
      </div>
    );
  if (isLoading) return <div>Loading...</div>;
  console.log(data);

  if (isError && error.status === 404)
    return (
      <div>
        <Error404Page />
      </div>
    );

    const onChange = (currentSlide: number) => {
      console.log(currentSlide);
    };

  return (
    <div className="product-page">
      <div className="product-page__body">
        <div className="product-page__image-section">
          <Carousel
            afterChange={onChange}
            dots={{ className: "product-carousel-dots" }}
          >
            {data?.images?.map((imageUrl, index) => (
              <img
                key={index}
                className="product-page__image"
                src={imageUrl}
                alt={data?.title ?? `product-image-${index}`}
              />
            ))}
          </Carousel>
        </div>

        <div className="product-page__details">
          <div className="product-page__header">
            <div className="product-page__title-wrap">
              <h2 className="product-page__title">{data?.title}</h2>
              {data?.rating && <RatingComponent rating={data.rating} />}
            </div>

            <h5 className="product-page__category">
              {data?.category?.toUpperCase()}
            </h5>
          </div>

          <div className="product-page__description">
            <p>Description: {data?.description}</p>
          </div>

          <div className="product-page__stock">
            <p>In Stock: {data?.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
