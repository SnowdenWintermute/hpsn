import {useQuery} from "@tanstack/react-query"
import axios from "axios"

const fetchClasses  = async () => {
    const response = await axios.get('http://localhost:3100/students/a/getclasses')
    return response.data
}

const useFetchClasses = () => {
    return useQuery(['classes'], fetchClasses)
}

export default useFetchClasses