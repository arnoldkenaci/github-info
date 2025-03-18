import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', // Your NestJS backend URL
  withCredentials: true, // Include cookies for refresh token
});

// Interceptor for refreshing tokens when access token expires
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        // Attempt to refresh token
        const refreshResponse = await axios.get(
          'http://localhost:3000/auth/refresh',
          { withCredentials: true },
        );

        if (refreshResponse.data.accessToken) {
          localStorage.setItem('token', refreshResponse.data.accessToken);
          error.config.headers['Authorization'] =
            `Bearer ${refreshResponse.data.accessToken}`;
          return axios.request(error.config);
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
