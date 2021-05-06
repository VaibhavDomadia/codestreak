import axios from 'axios';
import { getToken } from './authentication';

const instance = axios.create({
    baseURL: 'http://localhost:8000'
});

instance.interceptors.request.use((config) => {
    const token = getToken();

    if(token) {
        config.headers['Authorization'] = token;
    }

    return config;
}, (error) => Promise.reject(error));