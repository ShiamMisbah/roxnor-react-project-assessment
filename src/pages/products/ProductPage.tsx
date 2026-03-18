import React, { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetSearchedProductsQuery,
} from "../../state/product/productApiSlice";
import { Button, Table, type TablePaginationConfig } from "antd";
import type { Product, ProductsResponse } from "../../types/Product";
import type { ColumnsType } from "antd/es/table";
import TableComponent from "../../components/TableComponent";
import SearchTab from "../../components/SearchTab";
import DropDownComponent from "../../components/DropDownComponent";

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
    render: (_, record) => <Button>View {record.id}</Button>,
  },
];

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentResponse, setCurrentResponse] = useState<ProductsResponse>();

  const skip = (page - 1) * pageSize;

  const {data: categoryList} = useGetCategoriesQuery({})  

  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProductsQuery({ limit: pageSize, skip });

  const {
    data: searchedProducts,
    isLoading: searchedLoading,
    isError: searchedEror,
  } = useGetSearchedProductsQuery({ keyword: searchQuery });

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
    if (searchQuery.trim() === "") {
      setCurrentResponse(productData);
    } else {
      setCurrentResponse(searchedProducts);
    }
  }, [productData, searchedProducts, searchQuery]);

  if (isError) {
    return <p>Failed to load products.</p>;
  }

  if (isLoading) return <div>Is loading</div>;
  if (isError) return <div>Is Error</div>;
  return (
    <div className="relative flex flex-col">
      <SearchTab setSearchQuery={setSearchQuery} isLoading={searchedLoading} />
      {categoryList && <DropDownComponent itemList={categoryList} />}
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
