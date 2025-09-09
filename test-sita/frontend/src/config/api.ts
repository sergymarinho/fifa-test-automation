import axios from "axios";
const API_PORT = '3000';
export const baseURL = 'http://localhost:' + API_PORT + '/api/'

const api = axios.create({ baseURL })

export default api;