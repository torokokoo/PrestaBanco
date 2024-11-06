import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '52.233.92.96'
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT 

console.log(`Conectado al backend en ${BACKEND_URL}:${BACKEND_PORT}`)

export default axios.create({
    baseURL: `http://${BACKEND_URL}:${BACKEND_PORT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});