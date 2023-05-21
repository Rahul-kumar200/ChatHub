import React, { useState } from "react";
import userData from "../../../recoil/atom";
import { useRecoilState } from "recoil";
import currentData from "../../../recoil/currentData";
import "./RoomList.css";

const RoomList = () => {
  const [dataAtom, setDataAtom] = useRecoilState(userData);
  const [currentRoom, setCurrentRoom] = useRecoilState(currentData);

  const selectRoom = (choosenRoom) => {
    if (currentRoom.roomId !== choosenRoom.roomId) {
      let new_obj = [];
      for (let room of dataAtom.rooms) {
        if (room.roomId == currentRoom.roomId) {
          new_obj.push({
            roomId: room.roomId,
            newMessage: false,
            chats: currentRoom.chats,
          });
        } else if (room.roomId == choosenRoom.roomId) {
          new_obj.push({
            roomId: choosenRoom.roomId,
            newMessage: false,
            chats: choosenRoom.chats,
          });
        } else {
          new_obj.push(room);
        }
      }
      
      setCurrentRoom({
        roomId: choosenRoom.roomId,
        newMessage: false,
        chats: choosenRoom.chats,
      });
      setDataAtom({ username: dataAtom.username, rooms: new_obj });
    }
  };

  return (
    <div className="roomList">
      {dataAtom.rooms.map((room) => {
        return (
          <div className={currentRoom.roomId===room.roomId?"selectedRoom":"room"} onClick={() => selectRoom(room)}>
            <div className="roomInfo">
              <p className="roomName">{room.roomId}</p>
              {room.newMessage && <span className="newMessageAlert">new</span>}
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
