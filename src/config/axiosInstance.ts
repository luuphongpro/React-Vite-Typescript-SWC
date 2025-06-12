import axios from 'axios';
const axiosInstance = axios.create({
  // baseURL: 'https://6847b60fec44b9f3493deebd.mockapi.io/api',
  baseURL: 'https://dummyjson.com',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);
export default axiosInstance;