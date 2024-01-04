import React from "react";
import './ConversationComponent.css'
import ConversationHeader from "./ConversationHeader";
import ConversationArea from "./ConversationArea";
import { RecoilState, useRecoilState } from "recoil";
import zIndex from "../../../recoil/toggleZIndex";

const ConversationComponent = ()=>{
    const [zindex , setZIndex] = useRecoilState(zIndex)
    return (
       <div className={`conversationComponent ${zindex.mainZIndex ==1 ? 'conversationComponent1' : 'conversationComponent2'}` } >
        <ConversationHeader/>
        <ConversationArea/>
       </div>
    )
}

export default ConversationComponent;