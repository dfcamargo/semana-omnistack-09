import axios from 'axios';

const api = axios.create({
    baseURL: 'https://omnistack-semana-09-backend.herokuapp.com'
});

export default api;