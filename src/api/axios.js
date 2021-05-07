import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44326/'
});

export { axiosInstance };
