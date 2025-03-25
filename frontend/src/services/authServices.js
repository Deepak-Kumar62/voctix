import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/users`,
  withCredentials: true,
});

export const getUser = async () => {
  const response = await client.get("/me");
  return response.data;
};

export const login = async (credentials) => {
  await client.post("/login", credentials);
};

export const register = async (userData) => {
  const response = await client.post("/register", userData);
  return response.message;
};

// Logout user
export const logout = async () => {
  const response = await client.post("/logout");
  return { message: response.message, user: null };
};
