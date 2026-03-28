import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
  {
    synchronous: true,
  }
);

axiosInstance.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
