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
  const response = await client.post("/login", credentials);
  const user = await getUser();
  return { message: response.message, user };
};

export const register = async (userData) => {
  const response = await client.post("/register", userData);
  const user = await getUser();
  return { message: response.message, user };
};

// Logout user
export const logout = async () => {
  const response = await client.post("/logout");
  return { message: response.message, user: null };
};
