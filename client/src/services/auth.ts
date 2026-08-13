import apiRequest from "../utils/apiRequest";



export const signInService = async (username: string, password: string) => {
  const response = await apiRequest.post("/auth/login", { username, password });
  return response.data; // { message, token }
};
