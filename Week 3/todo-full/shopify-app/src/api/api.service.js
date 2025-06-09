import axios from "axios"
import dotenv from "dotenv";

dotenv.config()

const instance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true
})
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if (response.data) {
        return response.data
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;

