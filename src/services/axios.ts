import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

const getAccessToken = () => localStorage.getItem("accessToken");

// Request interceptor
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor + refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "https://dummyjson.com/auth/refresh",
          { refreshToken, expiresInMins: 30 },
          { withCredentials: true },
        );

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
