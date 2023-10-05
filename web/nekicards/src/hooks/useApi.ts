import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API
})

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('http://localhost:8080/login', {
            token,
        });
        return response.data
    },
    signin: async (email: string, senha: string) => {
        const response = await api.post('http://localhost:8080/login', {
            email,
            senha
        });
        console.log("DEU CERTO", response.data);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    }
})