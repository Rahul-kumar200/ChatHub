import {atom} from 'recoil'

const defaultState ={
    mainZIndex : 0,
    sideZIndex : 1
}

const zIndex = atom({
    key : 'zIndex',
    default : defaultState,
})

export default zIndex;