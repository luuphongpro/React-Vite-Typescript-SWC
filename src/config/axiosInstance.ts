import axios from 'axios';
const axiosInstance = axios.create({
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