import { client } from "../utils/axiosClient";
import { Product } from "../types/Product";

export const getProduct = (productId: number) => {
  return client.get<Product>(`/products?productId=${productId}`);
};

export const getProducts = () => {
  return client.get<Product[]>("/products");
};

export const createProduct = (data: Product) => {
  return client.post<Product>("/products", data);
};
