import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";
import { signInService } from "../services/auth";

export const useSignIn = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => signInService(username, password),
    onSuccess: (data) => {
      setToken(data.token); // store JWT in Zustand
      toast.success(data.message);
      window.location.href = "/dashboard"; // redirect after login
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
};
