import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// This function will call the API endpoint to update the user
const updatePersonStatus = async ({ id, comment }) => {
  if (!comment) throw new Error("Comment is required to deactivate a person.");

  const response = await axios.post(
    `http://localhost:3100/employee/deactivate/teacher/${id}`,
    {
      status: {
        isActive: false,
        comments: comment,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to update person status");
  }
};
const updateStudentStatus = async ({ id, comment }) => {
  if (!comment) throw new Error("Comment is required to deactivate a person.");

  const response = await axios.post(
    `http://localhost:3100/students/status/${id}`,
    {
      status: {
        isActive: false,
        comments: comment,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to update person status");
  }
};

export const useDeactivateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePersonStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("teachers");
    },
  });
};
export const useDeactivateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePersonStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
    },
  });
};
export const useDeactivateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation(updateStudentStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['students', classID]);
    },
  });
};
