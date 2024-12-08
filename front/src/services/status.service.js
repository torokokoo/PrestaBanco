import axios from '@/config/axios'
const getAll = async() => {
    return await axios.get('/api/status/')
}

const getById = async (id) => {
    return await axios.get(`/api/status/${id}`)
}

export default { getAll, getById }