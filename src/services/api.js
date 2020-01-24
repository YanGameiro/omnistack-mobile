import axios from 'axios';
import env from '../../env.js';

const api = axios.create({
    baseURL: env.API_URL,
})

export default api;