import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const getStoredToken = (key: "accessToken" | "refreshToken") => {
  const directToken = localStorage.getItem(key);
  if (directToken) return directToken;

  const stored = localStorage.getItem("auth-storage");
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return parsed?.[key] ?? parsed?.state?.[key] ?? null;
  } catch {
    return null;
  }
};

// Request interceptor
api.interceptors.request.use((config) => {
  const token = getStoredToken("accessToken");
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
        const refreshToken = getStoredToken("refreshToken");

        const response = await axios.post(
          "https://dummyjson.com/auth/refresh",
          {
            refreshToken,
            expiresInMins: 30,
          },
          { withCredentials: true },
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
