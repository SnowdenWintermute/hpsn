import {useQuery} from "@tanstack/react-query"
import axios from 'axios';

function useFetchStudentsByClass(classID) {
  return useQuery(['students', classID], async () => {
    console.log('Fetching students with classID:', classID);
  
    const { data } = await axios.get(`http://localhost:3100/students/class/${classID}`);
    return data;
  },{
    enabled: !!classID  // only fetch if classID is defined
  });
}

export default useFetchStudentsByClass;
