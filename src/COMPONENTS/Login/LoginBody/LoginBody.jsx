import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginNavBar from "../LoginNavBar/LoginNavBar";
import LoginForm from "../LoginForm/LoginForm";
import Image from "/chatting-design-concept-with-hand-holding-cellphone_7087-798.webp";
import api from "./../../../API/api";
export default function LoginBody() {
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
      const user = await api.post("/login", newUser, {
        withCredentials: true
      });
      console.log(user.data)
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
    <div className="w-[100%] h-[100vh] flex flex-col gap-1 ">
      <LoginNavBar />
      <div className="w-[100%] h-[90%] flex items-center justify-evenly">
        <img src={Image} />
        <LoginForm
          loading={loading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          serverMsg={serverMsg}
          setLoading={setLoading}
          ServerMessage={ServerMessage}
        />
      </div>
    </div>
  );
}
