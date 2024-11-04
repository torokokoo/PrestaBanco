import axios from '@/config/axios'
const getAll = async() => {
    return await axios.get('/api/status/')
}

export default { getAll, }