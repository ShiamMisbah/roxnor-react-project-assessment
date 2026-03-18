import React, { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetProductsCategoriesQuery,
  useGetProductsQuery,
  useGetSearchedProductsQuery,
} from "../../state/product/productApiSlice";
import { Button, Skeleton, Table, type TablePaginationConfig } from "antd";
import type { Product, ProductsResponse } from "../../types/Product";
import type { ColumnsType } from "antd/es/table";
import TableComponent from "../../components/TableComponent";
import SearchTab from "../../components/SearchTab";
import DropDownComponent from "../../components/DropDownComponent";
import ProductSkeletonPage from "../skeletonPages/ProductSkeletonPage";

const columns: ColumnsType<Product> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `$${price}`,
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => <Button>View Product {record.id}</Button>,
  },
];

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentResponse, setCurrentResponse] = useState<ProductsResponse>();
  const [currentSlug, setCurrentSlug] = useState<string>("all");

  const skip = (page - 1) * pageSize;

  const { data: categoryList } = useGetCategoriesQuery({});

  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductsQuery({ limit: pageSize, skip });

  const {
    data: searchedProducts,
    isLoading: searchedLoading,
    isError: searchedError,
  } = useGetSearchedProductsQuery({ keyword: searchQuery });

  const {
    data: searchedProductsByCategory,
    isLoading: searchedLoadingProductsByCategory,
    isError: searchedErrorProductsByCategory,
  } = useGetProductsCategoriesQuery({ slug: currentSlug });

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const currentPage = pagination.current ?? 1;
    const currentPageSize = pagination.pageSize ?? 10;

    // if page size changes, usually go back to page 1
    if (currentPageSize !== pageSize) {
      setPage(1);
      setPageSize(currentPageSize);
      return;
    }

    setPage(currentPage);
  };

  useEffect(() => {    
    const hasSearch = searchQuery.trim() !== "";
    const hasCategory = currentSlug.trim() !== "all";
    
    if (hasSearch) {      
      setCurrentResponse(searchedProducts);
      return;
    } else {
      setCurrentResponse(hasCategory ? searchedProductsByCategory : productData);
      return;
    }
  }, [
    productData,
    searchedProducts,
    searchedProductsByCategory,
    searchQuery,
    currentSlug,
  ]);

  if (isLoading) return (
    <ProductSkeletonPage />
  );
  if (isError) return <div>Is Error</div>;
  return (
    <div className="relative flex flex-col md:px-4">
      <SearchTab setSearchQuery={setSearchQuery} isLoading={searchedLoading} />
      {categoryList && (
        <DropDownComponent
          itemList={categoryList}
          setCurrentSlug={setCurrentSlug}
        />
      )}
      <TableComponent
        columns={columns}
        handleTableChange={handleTableChange}
        isLoading={isLoading}
        paginationDetails={{
          currentPage: page,
          pageSize,
          totalPages: currentResponse?.total,
        }}
        tableData={currentResponse?.products}
      />
    </div>
  );
};

export default ProductPage;
