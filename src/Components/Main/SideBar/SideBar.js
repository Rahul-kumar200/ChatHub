import React from "react";
import './SideBar.css'

import SideBarHeader from "./SideBarHeader";
import RoomList from "./RoomList";
import SideBarFooter from "./SideBarFooter";


const SideBar = ()=>{

    return (
       <div className="sideBar">
        <SideBarHeader/>
        <RoomList/>
        <SideBarFooter/>
       </div>
    )
}

export default SideBar;