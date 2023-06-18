import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// const registerUser = async (credentials) => {

//   const response = await axios.post(
//     "http://localhost:3100/auth/register",
//    credentials
//   );
//  return response.data;
// };

// export function useCreateUserMutation(){
//  // const queryClient = useQueryClient();
//   return useMutation(registerUser);

// }
import { useMutation } from "@tanstack/react-query";

export const useCreateUsers = (credentials) => {
  const queryClient = useQueryClient();

  const response = axios.post(
    "http://localhost:3100/auth/register",
    credentials
  );
  return response.data;
};
