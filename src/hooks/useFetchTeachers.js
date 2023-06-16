import {useQuery} from "@tanstack/react-query"
import axios from "axios"

const fetchTeachers  = async () => {
    const response = await axios.get('http://localhost:3100/employee/teaching')
    return response.data
}

const useFetchTeachers = () => {
    return useQuery(['teachers'], fetchTeachers)
}

export default useFetchTeachers