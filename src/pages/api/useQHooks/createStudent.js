import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const createStudent = async (studentData) => {
  const response = await axios.post(
    "http://localhost:3100/students/createNewStudent",
    studentData
  );
  return response.data;
};

export function useCreateStudent() {
  return useMutation(createStudent);
} 