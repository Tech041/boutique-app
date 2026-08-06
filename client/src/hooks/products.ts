import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  fetchProductBySlug,
  fetchProducts,
  type PaginatedResponse,
  type Product,
  type ProductSlug,
} from "../services/products";

export const useProducts = (page: number, limit: number) => {
  return useQuery<PaginatedResponse>({
    queryKey: ["products", page, limit],
    queryFn: () => fetchProducts(page, limit),
    placeholderData: keepPreviousData, // smooth pagination
    refetchOnWindowFocus: false, // avoid refetch spam
  });
};

export const useProduct = (slug: string) => {
  return useQuery<ProductSlug>({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug, // only run when slug is defined
    refetchOnWindowFocus: false,
  });
};

// fetch by collection type

export const useCollectionProducts = (collectionType: string) => {
  return useQuery<Product[]>({
    queryKey: ["collectionProducts", collectionType],
    queryFn: async () => {
      const { data } = await axios.get<{
        success: boolean;
        products: Product[];
      }>(`http://localhost:5000/api/shop/collection/${collectionType}`);
      return data.products;
    },
    enabled: !!collectionType,
    refetchOnWindowFocus: false,
  });
};
