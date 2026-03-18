import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductsQuery } from "../../state/product/productApiSlice";
import Error404Page from "../errorPage/Error404Page";
import './SingleProductPage.scss'
import { Button, Carousel } from "antd";
import RatingComponent from "../../components/ratingComponent/RatingComponent";
import SingleProductSkeleton from "../skeletonPages/SingleProductSkeleton";
import DrawerComponent from "../../components/DrawerComponent";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store";
import { currentProduct } from "../../state/product/productSlice";

type Props = {};

const SingleProductPage = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const numericId = Number(id);
  const hasId = typeof id === "string" && id.trim() !== "";
  const isValidId = hasId && Number.isInteger(numericId) && numericId > 0;

  const { data, isLoading, isError, error } = useGetSingleProductsQuery(
    { id: numericId },
    { skip: !isValidId },
  );  

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      dispatch(currentProduct(data));      
    }
  }, [data])

  if (!id)
    return (
      <div>
        <Error404Page />
      </div>
    );
  if (isLoading) return <SingleProductSkeleton />;

  if (isError && error.status === 404)
    return (
      <div>
        <Error404Page />
      </div>
    );

  return (
    <div className="product-page">
      <div className="product-page__body">
        <div className="product-page__image-section">
          <Button onClick={showDrawer} className="product-page__edit-button">
            Edit
          </Button>
          <Carousel
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
            <div className="product-page__price-wrap">
              <h5 className="product-page__price">$ {data?.price}</h5>
              <h5 className="product-page__category">
                {data?.category?.toUpperCase()}
              </h5>
            </div>
          </div>

          <div className="product-page__description">
            <p>Description: {data?.description}</p>
          </div>

          <div className="product-page__stock">
            <p>In Stock: {data?.stock}</p>
          </div>
        </div>
      </div>
      <DrawerComponent open={open} onClose={onClose} />
    </div>
  );
};

export default SingleProductPage;
