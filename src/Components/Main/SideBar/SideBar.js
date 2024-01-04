import React from "react";
import './SideBar.css'
import { useRecoilState } from "recoil";
import zIndex from "../../../recoil/toggleZIndex";

import SideBarHeader from "./SideBarHeader";
import RoomList from "./RoomList";
import SideBarFooter from "./SideBarFooter";


const SideBar = ()=>{
    const[zindex , setZIndex] = useRecoilState(zIndex);

    return (
       <div className={`sideBar ${zindex.sideZIndex==1 ? 'sideBar1' : 'sideBar2'}` }>
        <SideBarHeader/>
        <RoomList/>
        <SideBarFooter/>
       </div>
    )
}

export default SideBar;