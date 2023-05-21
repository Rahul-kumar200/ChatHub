import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import currentData from "../../../recoil/currentData";
import userData from "../../../recoil/atom";
import "./ConversationArea.css";
import sendButton from "./../../../logo/sendButton.png";
import {socket} from "./../../../services/socket"

const ConversationArea = () => {
  const sendButtonRef = useRef(null);
  const messageEndRef = useRef(null);
  const [dataAtom,setDataAtom] = useRecoilState(userData);
  const [currentRoom, setCurrentRoom] = useRecoilState(currentData);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendButtonRef.current.click();
    }
  };

  useEffect(()=>{
    if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView();
      }
  },[currentRoom,currentMessage])

  const sendMessage = () => {
    if(currentMessage.trim()!=='' && currentRoom.roomId.trim()!==''){
        socket.emit('sendMessage',currentMessage,currentRoom.roomId,dataAtom.username)
        let obj = currentRoom.chats;
        setCurrentRoom({roomId : currentRoom.roomId , newMessage: false , chats :[...obj , {name :'You',type:0,chat :currentMessage}]}); 
    }
    setCurrentMessage('')
  };

  socket.on('receiveMessage',(msg,roomId,name)=>{
    if(roomId===currentRoom.roomId){
        let obj = currentRoom.chats;
        setCurrentRoom({roomId : currentRoom.roomId , newMessage: false , chats :[...obj , {name :name ,type:1,chat :msg}]}); 
        setDataAtom({username : dataAtom.username , rooms :dataAtom.rooms})
    }
    else{
        let obj=[];
        for(let room of dataAtom.rooms){
            if(room.roomId===roomId){
                let prev_chats = room.chats;
                obj.push({roomId:roomId , newMessage:true , chats:[...prev_chats,{name:name,type:1,chat:msg}]});
            }
            else{
                obj.push(room);
            }
        }
        setCurrentRoom({roomId : currentRoom.roomId , newMessage: false , chats : currentRoom.chats}); 
        setDataAtom({username : dataAtom.username , rooms : obj})
    }
  })

  return (
    <>
      <div className="conversationArea">
        {currentRoom.chats.map((chat) => {
          return (
            <div>
              <div
                className={
                  chat.name === "You" ? "my_message_info" : "other_message_info"
                }
              >
                {chat.name}
              </div>
              <div className={chat.type === 0 ? "my_message" : "other_message"}>
                {chat.chat}
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} className="my_message_info"></div> 
      </div>

      <div className="newMessageContainer">
        <input
          className="newMessage"
          placeholder="Type your message here"
          onKeyDown={handleKeyPress}
          onChange={(e)=>setCurrentMessage(e.target.value)}
          value={currentMessage}
        />
        <img
          src={sendButton}
          className="sendMessage"
          ref={sendButtonRef}
          onClick={sendMessage}
        />
      </div>
    </>
  );
};

export default ConversationArea;
