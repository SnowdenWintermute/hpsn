import { useMutation } from "@tanstack/react-query";
import{useCreateUsers} from "../../hooks/Auth/useRegister";
import { useState } from "react";
const InitialForm = {
  username: "",
  password: "",
};
export default function Login() {
  const [form, setForm] = useState(InitialForm);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const userMutation = useCreateUsers();
  const handleSubmit = (e) => {
    e.preventDefault();
    userMutation.mutate(form, {
      onSuccess: () => {
        setMessage("User created successfully!");
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  return (
    <div className="h-10 w-10 bg-black z-40 absolute rounded-xl opacity-90 top-1/2 left-1/2 p-[10rem] -translate-x-1/2 -translate-y-1/2 ">
      <div className="flex flex-col justify-center -mt-[8rem] items-center">
        <h1 className="text-gray-400 text-center text-2xl">REGISTER</h1>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-800 text-white text-sm p-1 rounded-md m-2"
            name="username"
            onChange={handleChange}
           // value={form?.username}
          />
          <input
            type="text"
            placeholder="password"
            className="bg-gray-800 text-white text-sm p-1 rounded-md m-2"
            name="password"
            onChange={handleChange}
        //    value={form?.password}
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
