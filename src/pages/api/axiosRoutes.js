import axios from 'axios';


const classApi = axios.create({
    baseURL: 'https://localhost:3100/students/a/getclasses',
})

export const getClasses = async() => {
    const response = await classApi.get()
    return response.data
}
