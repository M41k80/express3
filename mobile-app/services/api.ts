import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-salud.onrender.com',
});

export default api;