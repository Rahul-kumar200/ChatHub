import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "./ConversationHeader.css";
import { useNavigate } from "react-router-dom";
import currentData from "../../../recoil/currentData";
import axios from "axios";
import userData from "../../../recoil/atom";
import backbutton from "../../../logo/backbutton.png"
import zIndex from "../../../recoil/toggleZIndex";

const ConversationHeader = () => {
  const navigate = useNavigate();
  const [currentRoom, setcurrentRoom] = useRecoilState(currentData);
  const [dataAtom,setDataAtom] = useRecoilState(userData)
  const [roomLogo, setRoomLogo] = useState("");
  const[zindex , setZIndex] = useRecoilState(zIndex);

  useEffect(() => {
    setRoomLogo(currentRoom.roomId.substring(0, 2));
  });

  const changeZIndex = ()=>{
    setZIndex({sideZIndex : 1 , mainZIndex : 0});
  }

  const logout = async()=>{

    let new_obj = [];
      for (let room of dataAtom.rooms) {
        if (room.roomId == currentRoom.roomId) {
          new_obj.push({
            roomId: room.roomId,
            newMessage: 0,
            chats: currentRoom.chats,
          });
        }else {
          new_obj.push(room);
        }
      }

    let finalData = {username : dataAtom.username , rooms :new_obj}
    let res = await axios.post('https://chathubserver.onrender.com/api/logout',finalData)
    if(res.data.status=='success'){
        navigate("/");
    }
    else{
        console.log('Server Error...')
     }

     setDataAtom({username:'',rooms:[]})
  }


  return (
    <div className="conversationHeader">
      <div className="title">
        <img src={backbutton} className="backbutton" onClick={changeZIndex}/>
        <div className={`roomLogo ${currentRoom.roomId=='' ? 'roomLogobackground1' : 'roomLogobackground2'}`}>{roomLogo}</div>
        <div className="roomName">{currentRoom.roomId}</div>
      </div>
      <div className="logoutDiv">
        <button className="logoutButton" onClick={logout}>
            Logout
        </button>
      </div>
    </div>
  );
};

export default ConversationHeader;
