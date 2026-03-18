import { Button } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useState } from 'react'
import '../index.scss'

type SearchTabProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean
};


const SearchTab = ({ setSearchQuery, isLoading }: SearchTabProps) => {
  return (
    <div className='mainDiv'>
      <label htmlFor="">Category</label>
      <Search
        className="w-full"
        placeholder="input search text"
        enterButton="Search"
        size="large"
        loading={isLoading}
        onSearch={(e) => setSearchQuery(e)}
        allowClear
      />
    </div>
  );
};

export default SearchTab