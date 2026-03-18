import { Select } from 'antd';
import type { ProductCategory } from '../types/Product';
import '../index.scss'

type DropDownComponentProps = {
  itemList: ProductCategory[];
  setCurrentSlug: React.Dispatch<React.SetStateAction<string>>;
};

export type DropDownItemProperty = {
    key: string;
    label: string
};

const DropDownComponent = ({
  itemList,
  setCurrentSlug,
}: DropDownComponentProps) => {
  const handleChange = (value: string) => {
    setCurrentSlug(value);
  };
  return (
    <div className='mainDiv'>
      <label htmlFor="">Category</label>
      <Select
        showSearch={{ optionFilterProp: "label" }}
        placeholder="Select a person"
        defaultValue="all"
        style={{ width: 240 }}
        onChange={handleChange}
        options={[
          { value: "all", label: "All" },
          ...itemList.map((item) => ({
            value: item.slug,
            label: item.name,
          })),
        ]}
      />
    </div>
  );
};

export default DropDownComponent