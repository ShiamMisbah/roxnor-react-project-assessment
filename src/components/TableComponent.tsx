import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import React from 'react'

type TableComponentProps = {
  columns: ColumnsType<any>;
  tableData: any;
  isLoading: boolean;
  paginationDetails: PaginationDetails;
  handleTableChange: (pagination: TablePaginationConfig) => void;
};

export type PaginationDetails = {
    currentPage?: number,
    pageSize?: number,
    totalPages?: number,
    pageSizeOptions?: string[]
}

const TableComponent = ({
  columns,
  tableData,
  isLoading,
  paginationDetails = {
    currentPage: 1,
    pageSize: 10,
    pageSizeOptions: ["5", "10", "20", "50"],
    totalPages: 0,
  },
  handleTableChange,
}: TableComponentProps) => {  
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={tableData ?? []}
      loading={{
        spinning: isLoading,
        size: "large",
        description: "Loading Data"
      }}
      onChange={handleTableChange}
      pagination={{
        current: paginationDetails.currentPage,
        pageSize: paginationDetails.pageSize,
        total: paginationDetails.totalPages,
        showSizeChanger: true,
        pageSizeOptions: paginationDetails.pageSizeOptions,
      }}
    />
  );
};

export default TableComponent