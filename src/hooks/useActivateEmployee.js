import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";



const reactivateEmployeeStatus = async ({ id, comment }) => {
  if (!comment) throw new Error("Comment is required to reactivate a person.");
  const response = await axios.post(
    `http://localhost:3100/employee/update/teacher/${id}`,
    {
      status: {
        isActive: true,
        comments: comment, // update here
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to update person status");
  }
};
export const useActivateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(reactivateEmployeeStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
    },
  });
};