import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const createTeacher = async (teacherData) => {
  const response = await axios.post(
    "http://localhost:3100/employee/new/teacher",
    teacherData
  );
  return response.data;
};

export function useCreateTeacher() {
  return useMutation(createTeacher);
}