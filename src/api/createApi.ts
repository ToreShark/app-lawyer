import axios from 'axios';

const getToken = () => {
    return localStorage.getItem("authToken");
}
const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        "Content-Type": "application/json",
    }
})

instance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;