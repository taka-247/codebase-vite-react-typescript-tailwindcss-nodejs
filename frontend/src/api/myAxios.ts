import axios from 'axios';

const myAxios = axios.create({ baseURL: '/api' });

// TODO: Custom interceptors, e.g. attach JWT token so it is used when every request
// myAxios.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default myAxios;