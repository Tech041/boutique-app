import axios from "axios";

import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Request interceptor
apiRequest.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle token expiration
      if (status === 401 && data?.message === "Token expired") {
        useAuthStore.getState().logout();
        window.location.href = "/sign-in";
      }

      // Handle rate limit
      if (status === 429) {
        toast.error(data?.error || "Too many attempts. Retry later.");
      }
    }

    return Promise.reject(error);
  },
);

export default apiRequest;
