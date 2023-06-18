import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getStudent(studentId) {
    console.log(studentId);
  const response = await axios.get(`http://localhost:3100/students/profile/${studentId}`);
   return response.data
}

export default function useStudent(studentId) {
  return useQuery(['profile', studentId], () => getStudent(studentId), {
    enabled: !!studentId,
  });
}
