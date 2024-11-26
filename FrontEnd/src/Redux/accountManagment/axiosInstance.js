import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4002', // Base URL for your API
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token'); // Or however you store the token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
