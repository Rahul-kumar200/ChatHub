import React from "react";
import './ConversationComponent.css'
import ConversationHeader from "./ConversationHeader";
import ConversationArea from "./ConversationArea";

const ConversationComponent = ()=>{

    return (
       <div className="conversationComponent">
        <ConversationHeader/>
        <ConversationArea/>
       </div>
    )
}

export default ConversationComponent;