import axios from '@/config/axios'

const simulate = async(payload) => {
    return await axios.post('/api/mainframe/simulate', payload)
}

export default { simulate }