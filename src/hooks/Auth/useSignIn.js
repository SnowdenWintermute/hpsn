import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const signIn = async (credentials) => {
  const response = await axios.post(
    "http://localhost:3100/auth/login",
   credentials
  );
  return response.data;
};

export default function useSignIn() {
  return useMutation(signIn);
}
