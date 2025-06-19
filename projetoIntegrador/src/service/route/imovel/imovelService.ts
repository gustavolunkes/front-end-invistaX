import axios from "axios";
import { ImovelRoute } from "./imovelRoute";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json',
    }
});
api.interceptors.request.use(request => {
    console.log('Request:', request);
    return request;
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data);
        return Promise.reject(error);
    }
);

export const imovelRoute = new ImovelRoute(api);


