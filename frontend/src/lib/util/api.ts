import axios from "axios";
import { message } from "@/lib/antd-helper";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (!response) {
      message.error("Lỗi mạng hoặc không thể kết nối đến máy chủ.");
      return Promise.reject(error);
    }

    if (response.status === 401 && !config._retry) {
      config._retry = true;

      try {
        const res = await axios.post(
          `${baseURL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
        return axios(config);
      } catch (refreshErr) {
        localStorage.removeItem("accessToken");
        message.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        return Promise.reject(refreshErr);
      }
    }

    // 3. Xử lý các lỗi HTTP khác
    switch (response.status) {
      case 403:
        message.error(
          response.data.message || "Bạn không có quyền thực hiện hành động này."
        );
        break;
      case 400:
      case 422:

        console.warn("Lỗi dữ liệu:", response.data.message);
        break;
      case 500:
      default:
        message.error(
          response.data.message || "Có lỗi không xác định từ máy chủ."
        );
    }

    return Promise.reject(error);
  }
);

export default api;
