import axios from '@/config/axios'

const getAll = async() => {
    return await axios.get('/api/documents/')
}

const getById = async(id) => {
    return await axios.get(`/api/documents/${id}`)
}

export default { getAll, getById, }