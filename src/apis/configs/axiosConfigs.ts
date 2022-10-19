import axios from "axios"

export const api = axios.create({
    withCredentials: true,
    baseURL: "https://localhost/api/v1"
})

const errorHandler = (error: any) => {
    const statusCode = error.response?.status;

    // logging only errors that are not 401
    if (statusCode && statusCode != 401)
        console.error(error);

    return Promise.reject(error);
}

api.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem("token");

        if (!token)
            return;

        const parsedToken = JSON.parse(token);
    
        config.headers = {
            ...config.headers,
            authorization: `Bearer ${parsedToken}`,
        };
    
        return config;
    },
    (error) => Promise.reject(error)
  );

api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
})