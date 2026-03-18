import { useEffect, useState } from "react";
import {
  useGetCategoriesQuery,
  useGetProductsCategoriesQuery,
  useGetProductsQuery,
  useGetSearchedProductsQuery,
} from "../../state/product/productApiSlice";
import { Button, type TablePaginationConfig } from "antd";
import type { Product, ProductsResponse } from "../../types/Product";
import type { ColumnsType } from "antd/es/table";
import TableComponent from "../../components/TableComponent";
import SearchTab from "../../components/SearchTab";
import DropDownComponent from "../../components/DropDownComponent";
import ProductSkeletonPage from "../skeletonPages/ProductSkeletonPage";
import { Link } from "react-router-dom";
import GenericErrorPage from "../errorPage/GenericErrorPage";

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
    render: (_, record) => (
      <Link to={`/product/${record.id}`}>
        <Button>View Product {record.id}</Button>{" "}
      </Link>
    ),
  },
];

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentResponse, setCurrentResponse] = useState<ProductsResponse>();

  const [currentSlug, setCurrentSlug] = useState<string>("all");

  const [currentIsLoading, setCurrentIsLoading] = useState<boolean>(false);
  const [currentIsError, setCurrentIsError] = useState<boolean>(false);
  const [currentError, setCurrentError] = useState<any>(null);

  const skip = (page - 1) * pageSize;

  const { data: categoryList } = useGetCategoriesQuery({});

  const {
    data: productData,
    isLoading,
    isError,
    error
  } = useGetProductsQuery({ limit: pageSize, skip });

  const {
    data: searchedProducts,
    isLoading: searchedLoading,
    isError: searchedError,
    error: searchedErrorDetails
  } = useGetSearchedProductsQuery({ keyword: searchQuery });

  const {
    data: searchedProductsByCategory,
    isLoading: searchedLoadingProductsByCategory,
    isError: searchedErrorProductsByCategory,
    error: searchedErrorProductsByCategoryDetails,
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

    const nextResponse = hasSearch
      ? searchedProducts
      : hasCategory
        ? searchedProductsByCategory
        : productData;

    const nextLoading = hasSearch
      ? searchedLoading
      : hasCategory
        ? searchedLoadingProductsByCategory
        : isLoading;

    const nextIsError = hasSearch
      ? searchedError
      : hasCategory
        ? searchedErrorProductsByCategory
        : isError;

    const nextError = hasSearch
      ? searchedErrorDetails
      : hasCategory
        ? searchedErrorProductsByCategoryDetails
        : error;

    setCurrentResponse(nextResponse);
    setCurrentIsLoading(nextLoading);
    setCurrentIsError(nextIsError);
    setCurrentError(nextError);
  }, [
    searchQuery,
    currentSlug,
    searchedProducts,
    searchedLoading,
    searchedError,
    searchedErrorDetails,
    searchedProductsByCategory,
    searchedLoadingProductsByCategory,
    searchedErrorProductsByCategory,
    searchedErrorProductsByCategoryDetails,
    productData,
    isLoading,
    isError,
    error,
  ]);

  if (currentIsLoading) return <ProductSkeletonPage />;
  if (currentIsError) {
    return <GenericErrorPage currentError={currentError} />;
  }
  return (
    <div className="relative flex flex-col md:px-4">
      <div className="flex justify-center items-end gap-4">
        <SearchTab
          setSearchQuery={setSearchQuery}
          isLoading={searchedLoading}
        />
        {categoryList && (
          <DropDownComponent
            itemList={categoryList}
            setCurrentSlug={setCurrentSlug}
          />
        )}
      </div>

      <TableComponent
        columns={columns}
        handleTableChange={handleTableChange}
        isLoading={currentIsLoading}
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
