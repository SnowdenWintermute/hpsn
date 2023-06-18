import { useMutation } from "@tanstack/react-query";

import { useContext } from "react";
import useSignIn from "../../hooks/Auth/useSignIn";
import { userContext } from "@/context/userContext";

export default function Login() {
  const { setUser } = useContext(userContext);
  const signIn = useSignIn();
  const handleSubmit = (e) => {
    e.preventDefault();

    signIn.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          // Set the user in the context when the sign-in is successful
          setUser(data.data.token);
        },
      }
    );
  };
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

  //const userMutation = useCreateUserMutation()
  return (
    <div className="h-10 w-10 bg-gray-900 z-40 absolute rounded-xl opacity-90 top-1/2 left-1/2 p-[15rem] -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex flex-col justify-center -mt-[8rem] items-center">
        <h1 className="text-gray-400 text-center text-2xl">Sign In</h1>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-800 text-white text-sm p-1 rounded-md m-2"
            name="username"
            onChange={handleChange}
            value={formData.username}
          />
          <input
            type="text"
            placeholder="password"
            className="bg-gray-800 text-white text-sm p-1 rounded-md m-2"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          <div className="flex justify-center mt-2">
            <button onClick={handleSubmit} style={buttonStyle}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const buttonStyle = {
  fontSize: "9px",
  padding: "0.7em 2.7em",
  letterSpacing: "0.06em",
  position: "relative",
  fontFamily: "inherit",
  borderRadius: "0.6em",
  overflow: "hidden",
  transition: "all 0.3s",
  lineHeight: "1.4em",
  border: "2px solid #1BFD9C",
  background:
    "linear-gradient(to right, rgba(27, 253, 156, 0.1) 1%, transparent 40%,transparent 60% , rgba(27, 253, 156, 0.1) 100%)",
  color: "#1BFD9C",
  boxShadow:
    "inset 0 0 10px rgba(27, 253, 156, 0.4), 0 0 9px 3px rgba(27, 253, 156, 0.1)",
};
