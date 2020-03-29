import axios from 'axios';

const api = axios.create({
    baseURL: process.env.APP_URL,
});

export default api;