import { Button } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useState } from 'react'

type SearchTabProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean
};


const SearchTab = ({ setSearchQuery, isLoading }: SearchTabProps) => {
  return (
    <>
      <Search
        className="max-w-[50%] mx-auto my-4"
        placeholder="input search text"
        enterButton="Search"
        size="large"
        loading={isLoading}
        onSearch={(e) => setSearchQuery(e)}
        allowClear
      />
    </>
  );
};

export default SearchTab