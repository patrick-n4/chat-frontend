import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../COMPONENTS/Loading/Loading";
import api from "./../../API/api";
export default function LoginPage() {
  const [newUser, setUser] = useState({});
  const [serverMsg, setServerMsg] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  }
  async function handleSubmit(event) {
    if (newUser.email == null || newUser.password == null) {
      setLoading(false);
      return setServerMsg("Please fill the form!");
    }
    event.preventDefault();
    try {
      const user = await axios.post("/login", newUser, {
        withCredentials: true
      });
      if (user.data === "Not Found") {
        setLoading(false);
        return setServerMsg((msg) => "User is not found. Please Signup");
      } else if (user.data === "Incorrect Data") {
        setLoading(false);
        return setServerMsg(
          (msg) => "User password or email is not correct. Please Try again!"
        );
      }
      localStorage.setItem("token", user.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  }
  function ServerMessage() {
    return (
      <div className="w-[100%] h-[5%] px-3">
        <p className="text-[red] text-[1.2em]">{serverMsg}</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white w-[100%] h-[100vh] flex justify-center items-center  `}
    >
      <div
        className={`${
          loading ? "absolute" : "hidden"
        } absolute left-[50%] z-[1]`}
      >
        <Loading />
      </div>
      <form
        className={`bg-white w-[30em] h-[40em] shadow-xl rounded-md flex py-5 px-2 flex-col gap-4 ${
          loading ? "blur-sm" : "blur-none"
        } `}
        onSubmit={handleSubmit}
      >
        <div className="w-[100%] h-[12%] text-[2em] font-bold justify-center flex">
          Login
        </div>
        <div className="w-[100%] h-[12%] px-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-[100%] h-[100%] text-[1.3em]  focus:border-b-2 focus:border-blue-300 outline-none"
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-[100%] h-[12%] px-3">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-[100%] h-[100%] text-[1.3em]  focus:border-b-2 focus:border-blue-300 outline-none"
            onChange={handleChange}
            required
          />
        </div>
        {serverMsg !== "" ? <ServerMessage /> : null}
        <div className="flex h-[10%] w-[100%] justify-evenly ">
          <Link
            to="/signup"
            className="bg-blue-400 h-[100%] w-[40%] rounded-md shadow-lg text-[1.2em] font-bold flex items-center justify-center"
          >
            SIGNUP
          </Link>
          <button
            type="submit"
            className="bg-green-500 h-[100%] w-[40%] rounded-md shadow-lg text-[1.4em] font-bold"
            onClick={(event) => {
              setLoading(true);
              handleSubmit(event);
            }}
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}
