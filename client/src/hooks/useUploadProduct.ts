import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadProductService } from "../services/upload";

export const useUploadProduct = (setProgress: (p: number) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      uploadProductService(formData, setProgress),
    onSuccess: () => {
      toast.success("Product uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Upload failed");
    },
  });
};
