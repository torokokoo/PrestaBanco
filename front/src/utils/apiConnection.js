import axios from "@/config/axios"

const checkConnection = async () => {
    const { status } = await axios.get('/api/documents/');
    console.log(status)
    if (status != 200) {
        alert('Ha ocurrido un problema conectandose con la API')
    }
    return status
}

export default { checkConnection }