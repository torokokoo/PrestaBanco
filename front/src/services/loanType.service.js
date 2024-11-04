import axios from '@/config/axios'

const getAll = async () => {
    return await axios.get('/api/loan-types/')
}

export default { getAll, }