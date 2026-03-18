import { Select } from 'antd';
import type { ProductCategory } from '../types/Product';

type DropDownComponentProps = {
  itemList: ProductCategory[];
};

export type DropDownItemProperty = {
    key: string;
    label: string
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const DropDownComponent = ({ itemList }: DropDownComponentProps) => {
  return (
    <Select
      showSearch={{ optionFilterProp: "label", onSearch }}
      placeholder="Select a person"
      defaultValue="All"
      style={{ width: 240 }}
      onChange={handleChange}
      options={itemList.map((item) => ({
        value: item.slug,
        label: item.name,
      }))}
    />
  );
};

export default DropDownComponent