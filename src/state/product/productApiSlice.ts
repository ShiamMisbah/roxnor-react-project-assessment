import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product, ProductsResponse } from "../../types/Product";

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
      getSingleProducts: builder.query({
        query: ({ id = "" }) => `/products/${id}`,
      }),
      getSearchedProducts: builder.query({
        query: ({ keyword = "" }) => `/products/search?q=${keyword}`,
      }),
      getCategories: builder.query({
        query: () => `/products/categories`,
      }),
    };
  }
});

export const { useGetCategoriesQuery, useGetSearchedProductsQuery, useGetProductsQuery, useGetSingleProductsQuery } = productApiSlice