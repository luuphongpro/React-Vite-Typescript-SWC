import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://6847b60fec44b9f3493deebd.mockapi.io/api',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);