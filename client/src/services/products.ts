import apiRequest from "../utils/apiRequest";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sizes: string[];
  collectionType: string;
  image: string;
  publicId: string;
}

export interface PaginatedResponse {
  success: boolean;
  products: Product[];
  total: number;
  page: number;
  pages: number;
}

export const fetchProducts = async (
  page: number,
  limit: number,
): Promise<PaginatedResponse> => {
  const { data } = await apiRequest.get<PaginatedResponse>(
    `/shop/all-products?page=${page}&limit=${limit}`,
  );
  return data;
};

// fetch by slug

export interface ProductSlug {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sizes: string[];
  collectionType: string;
  image: string;
  publicId: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchProductBySlug = async (
  slug: string,
): Promise<ProductSlug> => {
  const { data } = await apiRequest.get<{
    success: boolean;
    product: ProductSlug;
  }>(`/shop/product/${slug}`);
  return data.product;
};

// product management

export const fetchAdminProducts = async (page: number, limit: number) => {
  const res = await apiRequest.get(
    `/shop/fetch-all?page=${page}&limit=${limit}`,
  );
  return res.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editProductService = async (id: string, data: any) => {
  const res = await apiRequest.patch(`/shop/update/${id}`, data);
  return res.data;
};

export const deleteProductService = async (productId: string) => {
  const res = await apiRequest.delete(`/shop/delete/${productId}`);
  return res.data;
};
