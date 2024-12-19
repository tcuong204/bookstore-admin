import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

// Tạo một instance của Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:6969/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Kiểu headers là Partial<AxiosRequestHeaders>
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders; // Đảm bảo kiểu dữ liệu
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
