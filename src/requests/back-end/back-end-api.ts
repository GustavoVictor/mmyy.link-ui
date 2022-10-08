import axios from "axios";

axios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.url ?? "http://localhost:5001");
        const allowedOrigins = ["https://localhost:7045", "http://localhost:5001"];
        const token = window.localStorage.getItem('token');

        if(allowedOrigins.includes(origin) && config.headers != null){
            config.headers.authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default axios