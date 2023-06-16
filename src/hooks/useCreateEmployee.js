import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const createEmployee = async (employeeData) => {
  const response = await axios.post(
    "http://localhost:3100/employee/new/nonteaching",
    employeeData
  );
  return response.data;
};

export function useCreateEmployee() {
  return useMutation(createEmployee);
  
}