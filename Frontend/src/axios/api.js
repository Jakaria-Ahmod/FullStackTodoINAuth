import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com';
// main api instance
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, // cookie
});

// refresh api instance
const refreshApi = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Request interceptor → সব request এর সাথে access token যাবে
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    console.log('Interceptor token:', token);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor → 401  auto refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh API call
        const res = await refreshApi.post('/refresh');
        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          // save token in localStorage
          localStorage.setItem('accessToken', newAccessToken);

          // retry original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.error('Refresh token failed:', err);
        localStorage.removeItem('accessToken');
        // window.location.href = "/login"; // optional
      }
    }

    return Promise.reject(error);
  }
);

export default api;
