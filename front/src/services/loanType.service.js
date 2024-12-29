import axios from '@/config/axios'

const getAll = async () => {
    return await axios.get('/api/loan-types/')
}

const getById = async (id) => {
    return await axios.get(`/api/loan-types/${id}`)
}

export default { getAll, getById }