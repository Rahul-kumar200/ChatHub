import {atom} from 'recoil'

const currentState = {
    roomId : '',
    newMessage:0,
    chats :[],
}

const currentData = atom({
    key:"currentRoom",
    default : currentState
})

export default currentData;