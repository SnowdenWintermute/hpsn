import {useQuery} from "@tanstack/react-query"
import axios from "axios"

const fetchEmployees  = async () => {
    const response = await axios.get('http://localhost:3100/employee/nonteaching')
    return response.data
}

const useFetchEmployees = () => {
    return useQuery(['employees'], fetchEmployees)
}

export default useFetchEmployees