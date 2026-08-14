import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import { toast } from "sonner";
import {
  deleteProductService,
  editProductService,
  fetchAdminProducts,
} from "../services/products";

export const useAdminProducts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => fetchAdminProducts(page, limit),
    placeholderData: keepPreviousData,
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      editProductService(id, data),
    onSuccess: () => {
      toast.success("Product updated!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (publicId: string) => deleteProductService(publicId),
    onSuccess: () => {
      toast.success("Product deleted!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
