import axios from "axios";
import { dispatchAntdMessage } from "./event-bus";

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
      dispatchAntdMessage('Lỗi mạng hoặc không thể kết nối đến máy chủ.');
      return Promise.reject(error);
    }

    if (response.status === 401 && !config._retry) {
      // đánh dấu đã retry để tránh loop vô hạn
      config._retry = true;

      try {
        const res = await axios.post(
          `${baseURL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = res.data;
        // Lưu token mới vào localStorage
        localStorage.setItem('accessToken', accessToken);

        // Retry request cũ với token mới
        config.headers.Authorization = `Bearer ${accessToken}`;
        return axios(config);
      } catch (refreshErr) {
        // Refresh fail → logout
        localStorage.removeItem('accessToken');
        dispatchAntdMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        return Promise.reject(refreshErr);
      }
    }

    // Xử lý các lỗi khác
    switch (response.status) {
      case 403:
        dispatchAntdMessage(response.data.message || 'Bạn không có quyền thực hiện hành động này.');
        break;
      case 400:
      case 422:
        console.warn('Lỗi 400/422:', response.data.message);
        break;
      case 500:
      default:
        dispatchAntdMessage(response.data.message || 'Có lỗi không xác định từ máy chủ.');
    }

    return Promise.reject(error);
  }
);

export default api;
