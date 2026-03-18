import { Button, Form, Input, InputNumber, Select, type FormProps } from "antd";
import React, { useEffect } from "react";
import type { Product } from "../types/Product";
import { useGetCategoriesQuery } from "../state/product/productApiSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";

type Props = {};

const FormComponent = (props: Props) => {
    const [form] = Form.useForm();

    const { data, isLoading, isError } = useGetCategoriesQuery({});
    const currentProduct = useSelector(
      (state: RootState) => state.singleProduct,
    );
  const onFinish: FormProps<Product>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  useEffect(() => {
    if (currentProduct) {
      form.setFieldsValue({
        title: currentProduct.title,
        category: currentProduct.category,
        price: currentProduct.price,
        rating: currentProduct.rating,
        stock: currentProduct.stock,
      });
    }
  }, [currentProduct, form]);

  if (!data) return null;
  
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 8 }}
      style={{ maxWidth: " 100%" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      variant="filled"
    >
      <Form.Item<Product>
        label="Title"
        name="title"
        rules={[
          { required: true, message: "Please input product title!" },
          { min: 3, message: "Title must be at least 3 characters!" },
          { max: 100, message: "Title cannot exceed 100 characters!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<Product>
        name="category"
        label="Category"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select
          allowClear
          placeholder="Select category"
          options={data.map((item) => ({
            label: item.name,
            value: item.slug,
          }))}
        />
      </Form.Item>

      <Form.Item<Product>
        label="Price"
        name="price"
        rules={[
          { required: true, message: "Please input price!" },
          {
            type: "number",
            min: 1,
            message: "Price must be greater than 0!",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item<Product>
        label="Rating"
        name="rating"
        rules={[
          { required: true, message: "Please input rating!" },
          {
            type: "number",
            min: 0,
            max: 5,
            message: "Rating must be between 0 and 5!",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item<Product>
        label="Stock"
        name="stock"
        rules={[
          { required: true, message: "Please input stock!" },
          {
            type: "number",
            min: 0,
            message: "Stock cannot be negative!",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} precision={0} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
