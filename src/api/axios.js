import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44383/'
});

export { axiosInstance };
