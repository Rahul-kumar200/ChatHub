import React from "react";
import './SideBarHeader.css'
import logo from './../../../logo/logo.jpg'

const SideBarHeader = ()=>{

    return (
       <div className="sideBarHeader">
        <img className="logo" src={logo} />
        <h2>ChatHub</h2>
       </div>
    )
}

export default SideBarHeader;