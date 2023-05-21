import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userData from "../../recoil/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import "./Signup.css";

const URL = "http://localhost:8000";

const Signup = () => {
  const navigate = useNavigate();
  const [dataAtom, setDataAtom] = useRecoilState(userData);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const createAccount = async () => {
    try {
      if (username.trim() === "" || password.trim() === "") {
        setErrorMessage("Error : Please fill all details");
      } else {
        const body = { username: username, password: password };
        const res = await axios.post(`${URL}/api/signup`, body);
        const data = res.data;
        if (data.status === "success") {
          setDataAtom({
            username: username,
            rooms: [],
          });
          navigate("/main-app");
        } else {
          setErrorMessage("Error : Username already Exists");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup_page">
      <p className="signup_heading">Sign Up...</p>
      <div className="signup_box">
        <input
          className="input_username"
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input_password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signup_button" onClick={createAccount}>
          Signup
        </button>
        <a className="backto_signin" onClick={() => navigate("/")}>
          Already an Account ? Login
        </a>
        <p className="errorMessage">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Signup;
