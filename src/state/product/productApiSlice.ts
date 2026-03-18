import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product, ProductCategory, ProductsResponse } from "../../types/Product";

export const productApiSlice = createApi({
  reducerPath: "Products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  endpoints: (builder) => {
    return {
      getProducts: builder.query<
        ProductsResponse,
        { limit?: number; skip?: number }
      >({
        query: ({ limit = 30, skip = 0 }) =>
          `/products?select=title,price,rating,stock,category&limit=${limit}&skip=${skip}`,
      }),
      getSingleProducts: builder.query<Product, {id: number}>({
        query: ({ id = "" }) =>
          `/products/${id}?select=images,title,description,price,rating,stock,category`,
      }),
      getSearchedProducts: builder.query<
        ProductsResponse,
        { keyword?: string }
      >({
        query: ({ keyword = "" }) => {
          if (keyword === "") return ``;
          return `/products/search?q=${keyword}`;
        },
      }),
      getCategories: builder.query<ProductCategory[], {}>({
        query: ({}) => `/products/categories`,
      }),
      getProductsCategories: builder.query<ProductsResponse, { slug: string }>({
        query: ({ slug }) => {
          if (!slug || slug === "") return ``;
          return `/products/category/${slug}`;
        },
      }),
    };
  }
});

export const { useGetCategoriesQuery, useGetSearchedProductsQuery, useGetProductsQuery, useGetSingleProductsQuery, useGetProductsCategoriesQuery } = productApiSlice