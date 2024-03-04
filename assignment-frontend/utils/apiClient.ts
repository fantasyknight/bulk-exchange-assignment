import axios from "axios";

const apiClient = () => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  return instance;
};

export default apiClient();
