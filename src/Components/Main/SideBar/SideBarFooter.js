import React,{useRef, useState} from "react";
import userData from "../../../recoil/atom";
import currentData from "../../../recoil/currentData";
import { useRecoilState } from "recoil";
import './SideBarFooter.css'
import { socket } from "../../../services/socket";


const SideBarFooter = ()=>{
    const joinButtonRef = useRef(null);
    const [dataAtom , setDataAtom] = useRecoilState(userData)
    const [currentRoom,setCurrentRoom] = useRecoilState(currentData);
    const [newRoom,setNewRoom] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          joinButtonRef.current.click();
        }
      };

    const joinRoom = ()=>{
        if(newRoom.trim()!==''){
            socket.emit('joinRoom',dataAtom.username,newRoom,()=>{
              console.log(`You have joined Room id: ${newRoom}`)
            })
            let obj = {roomId : newRoom , newMessage : false , chats : []};
            let newObj = {username : dataAtom.username , rooms : [...dataAtom.rooms , obj]};
      
            for (let i = 0; i < newObj.rooms.length; i++) {
              if (newObj.rooms[i].roomId === currentRoom.roomId) {
                newObj.rooms[i] = {
                  ...newObj.rooms[i],
                  chats: currentRoom.chats, 
                };
              }
            }

            setDataAtom(newObj)
            setCurrentRoom(obj)
            setNewRoom('');
        }
    }

    return (
       <div className="sideBarFooter">
        <input className="newRoomId" placeholder="Enter Room Id..." value={newRoom} onKeyDown={handleKeyDown} onChange={(e)=>setNewRoom(e.target.value)}/>
        <button className="joinRoom" ref={joinButtonRef} onClick={joinRoom}>Join</button>
       </div>
    )
}

export default SideBarFooter;