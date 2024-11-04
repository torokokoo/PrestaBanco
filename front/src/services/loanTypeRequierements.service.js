import axios from '@/config/axios'

const getRequierements = async (id) => {
    return await axios.get(`/api/loan-type-requierements/${id}`)
}

export default { getRequierements, }