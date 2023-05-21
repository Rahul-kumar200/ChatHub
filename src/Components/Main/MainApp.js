import React from "react";
import SideBar from "./SideBar/SideBar";
import ConversationComponent from "./Conversation/ConversationComponent";
import './MainApp.css'

const MainApp = () => {

  return (
    
    <div className="mainApp">
      <SideBar/>
      <ConversationComponent/>
    </div>
  );
};

export default MainApp;
