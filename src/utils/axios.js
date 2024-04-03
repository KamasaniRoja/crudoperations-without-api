import axios from "axios";

const axiosConfig = axios.create({
  // withCredentials: true,
  baseURL: process.env.REACT_APP_HOST_API_KEY,
});
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosConfig;
