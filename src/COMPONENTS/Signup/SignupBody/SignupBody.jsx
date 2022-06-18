import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./../../Loading/Loading";
import api from "./../../../API/api";
import SignUpNav from "../SignupNavBar/SignupNavBar";
import SignupForm from "../Signupform/SignupForm";
import Image from "/chatting-design-concept-with-hand-holding-cellphone_7087-798.webp";
export default function SignupBody() {
  const navigate = useNavigate();
  const [serverMsg, setServerMsg] = useState("");
  const [newUser, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (
      (await newUser.fname) == "" ||
      (await newUser.lname) == "" ||
      (await newUser.email) == "" ||
      (await newUser.username) == "" ||
      (await newUser.password) == "" ||
      (await newUser.cpassword) == ""
    ) {
      setLoading(false);
      return setServerMsg("Please fill the form provided");
    }
    if (newUser.password === newUser.cpassword) {
      try {
        const response = await axios.post("/signup", newUser, {
          withCredentials: true
        });
        if (response.data === "email already exists") {
          setLoading(false);
          return setServerMsg(
            "Email Already exists. Please use another email or Login"
          );
        }
        if (response.data === "username already exists") {
          setLoading(false);
          return setServerMsg(
            "Usename already exists. Please user another username"
          );
        }
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      setLoading(false);
      return setServerMsg(
        "Passwords don't match. Try using matching passwords"
      );
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
      <SignUpNav />
      <div className="w-[100%] h-[90%] flex items-center justify-evenly">
        <img src={Image} />
        <SignupForm
          ServerMessage={ServerMessage}
          loading={loading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          serverMsg={serverMsg}
        />
      </div>
    </div>
  );
}