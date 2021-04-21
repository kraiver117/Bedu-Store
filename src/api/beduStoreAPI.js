import axios from 'axios';

export const beduStoreAPI = axios.create({
    baseURL: 'https://bedu-e-commerce.herokuapp.com/v1'
});