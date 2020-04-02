import axios from 'axios';

const api = axios.create({
    baseURL: 'exp://2p-nih.anonymous.mobile.exp.direct:3333',
});

export default api;