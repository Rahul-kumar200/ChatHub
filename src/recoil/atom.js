import {atom} from 'recoil'

const defaultState ={
    username : '',
    rooms : [],
}

const userData = atom({
    key : 'userInfo',
    default : defaultState,
})

export default userData;