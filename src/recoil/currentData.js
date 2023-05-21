import {atom} from 'recoil'

const currentState = {
    roomId : '',
    newMessage:false,
    chats :[],
}

const currentData = atom({
    key:"currentRoom",
    default : currentState
})

export default currentData;