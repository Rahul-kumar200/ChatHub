import React, { useState } from "react";
import userData from "../../../recoil/atom";
import { useRecoilState } from "recoil";
import currentData from "../../../recoil/currentData";
import "./RoomList.css";
import zIndex from "../../../recoil/toggleZIndex";

const RoomList = () => {
  const [dataAtom, setDataAtom] = useRecoilState(userData);
  const [currentRoom, setCurrentRoom] = useRecoilState(currentData);
  const[zindex , setZIndex] = useRecoilState(zIndex);

  const selectRoom = (choosenRoom) => {
    if (currentRoom.roomId !== choosenRoom.roomId) {
      let new_obj = [];
      for (let room of dataAtom.rooms) {
        if (room.roomId == currentRoom.roomId) {
          new_obj.push({
            roomId: room.roomId,
            newMessage: 0,
            chats: currentRoom.chats,
          });
        } else if (room.roomId == choosenRoom.roomId) {
          new_obj.push({
            roomId: choosenRoom.roomId,
            newMessage: 0,
            chats: choosenRoom.chats,
          });
        } else {
          new_obj.push(room);
        }
      }
      
      setCurrentRoom({
        roomId: choosenRoom.roomId,
        newMessage: 0,
        chats: choosenRoom.chats,
      });
      setDataAtom({ username: dataAtom.username, rooms: new_obj });
    }
    setZIndex({sideZIndex:0 ,  mainZIndex : 1});
  };

  const deleteRoom =(e,choosenRoom)=>{
    e.stopPropagation();
      let sure = window.confirm(`Are you sure you want to leave ${choosenRoom.roomId} room`);
      
      if(sure){
          let obj=[];

          for(let room of dataAtom.rooms){
            if(room.roomId!==choosenRoom.roomId){
                obj.push(room);
            }
          }
          setDataAtom({username : dataAtom.username , rooms : obj});
          
          if(currentRoom.roomId===choosenRoom.roomId){
            setCurrentRoom({roomId:'' , chats:[] , newMessage:0})
          }

      }
  }

  return (
    <div className="roomList">
      {dataAtom.rooms.map((room) => {
        return (
          <div className={currentRoom.roomId===room.roomId?"selectedRoom":"room"} onClick={() => selectRoom(room)}>
            <div className="roomInfo">
              <p className="roomName">{room.roomId}</p>
              {room.newMessage>0 && <span className="newMessageAlert">{room.newMessage}</span>}
              <button className="deleteRoom" onClick={(e)=>deleteRoom(e,room)}>Leave</button>
            </div>
            <span className="lastChat">
              { room.chats.length>0 ? (room.chats[room.chats.length - 1].name + ": "):''}
              { room.chats.length>0 ? (room.chats[room.chats.length - 1].chat) :''}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default RoomList;
