import axios from 'axios';

const BACKEND_URL = import.meta.env.BACKEND_URL || 'localhost';
const BACKEND_PORT = import.meta.env.BACKEND_PORT || '8080';

console.log(`Conectado al backend en ${BACKEND_URL}:${BACKEND_PORT}`)

export default axios.create({
    baseURL: `http://${BACKEND_URL}:${BACKEND_PORT}`,
    headers: {
        'Content-Type': 'application/json'
    }
});