import axios from '@/config/axios'

const create = async (payload) => {
    return await axios.post('/api/loans/', payload)
}

const getAll = async() => {
    return await axios.get('/api/loans/')
}

const getById = async(id) => {
    return await axios.get(`/api/loans/${id}`)
}

const updateStatus = async(payload, newStatusId) => {
    // console.log(newStatusId);
    return await axios.put(`/api/loans/status?id=${newStatusId}`, payload)
}

export default { create, getAll, getById, updateStatus }