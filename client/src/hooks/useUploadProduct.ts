/* eslint-disable @typescript-eslint/no-explicit-any */
import imageCompression from "browser-image-compression";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import apiRequest from "@/utils/apiRequest";

export interface ProductUploadFormData {
  name: string;
  description: string;
  price: string;
  sizes: string[];
  collectionType: string;
  image: File | null;
}

export const useUploadProduct = (setProgress: (p: number) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductUploadFormData) => {
      // compress image before upload
      if (data.image instanceof File) {
        const options = {
          maxSizeMB: 2, // target max size
          maxWidthOrHeight: 1200, // resize if needed
        };
        try {
          const compressedFile = await imageCompression(data.image, options);
          data.image = compressedFile; // replace with compressed file
        } catch (err) {
          console.error("Image compression failed", err);
        }
      }

      const formData = new FormData();
      formData.append("file", data.image as Blob);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("sizes", JSON.stringify(data.sizes));
      formData.append("collectionType", data.collectionType);

      return apiRequest.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent: any) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total ?? 1),
          );
          setProgress(percent);
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product uploaded successfully!");
      setProgress(0);
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message: string }>;
      if (err.response) {
        toast.error(err.response.data.message || "Failed to upload product");
      } else {
        toast.error("Unexpected error occurred. Please try again.");
      }
    },
  });
};
