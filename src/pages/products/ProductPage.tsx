import React, { useState } from "react";
import { useGetProductsQuery } from "../../state/product/productApiSlice";
import { Button, Table, type TablePaginationConfig } from "antd";
import type { Product } from "../../types/Product";
import type { ColumnsType } from "antd/es/table";
import TableComponent from "../../components/TableComponent";

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

  const skip = (page - 1) * pageSize;

  const { data: productData, isLoading, isError } = useGetProductsQuery({limit: pageSize, skip});

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination);
    
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

  if (isError) {
    return <p>Failed to load products.</p>;
  }

  if (isLoading) return <div>Is loading</div>;
  if (isError) return <div>Is Error</div>;
  return (
    <div>
      <TableComponent
        columns={columns}
        handleTableChange={handleTableChange}
        isLoading={isLoading}
        paginationDetails={{ currentPage: page, pageSize, totalPages: productData?.total }}
        tableData={productData?.products}
      />
    </div>
  );
};

export default ProductPage;
