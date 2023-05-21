import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userData from "../../recoil/atom";
import axios from "axios";
import "./Login.css";
import { socket } from "../../services/socket";

const URL = "http://localhost:8000";

const Login = () => {
  const navigate = useNavigate();
  const [dataatom, setDataAtom] = useRecoilState(userData);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const joinYourRooms = (data)=>{
      for(let room of data.rooms){
        console.log("joined" , room.roomId)
        socket.emit('prevRoomJoin',room.roomId);
      }
  }

  const checkAuth = async () => {
    try {
      if (username.trim() !== "" && password.trim() !== "") {
        const body = { username: username, password: password };
        const res = await axios.post(`${URL}/api/login`, body);
        const data = res.data;
        if (data === null) {
          setErrorMessage("Error : Please check your Username or Password");
        } else {
          setDataAtom({
            username: username,
            rooms: data.rooms,
          });

          joinYourRooms(data);

          navigate("main-app");
        }
      } else {
        setErrorMessage("Error :Please Fill all the details");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signin_page">
      <p className="signin_heading">Sign In...</p>
      <div className="signin_box">
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
        <button className="signin_button" onClick={checkAuth}>
          {" "}
          Signin{" "}
        </button>
        <a className="create_account" onClick={() => navigate("signup")}>
          Create New Account
        </a>

        <p className="errorMessage"> {errorMessage} </p>
      </div>
    </div>
  );
};

export default Login;
