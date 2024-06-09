import axios from "axios";

export const handleLogin = async (formData) => {
  const response = await axios.post(
    "http://localhost:3001/authenticate",
    formData
  );
  return response.data;
};
