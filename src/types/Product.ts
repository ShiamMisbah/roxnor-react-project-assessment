export type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  description?: string;
  images?: string[]
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type ProductCategory = {
  slug: string,
  name: string,
  url: string
}