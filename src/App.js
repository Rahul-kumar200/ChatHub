import React, { useEffect } from 'react';
import { socket } from './services/socket';
import Signup from './Components/Register/Signup';
import Login from './Components/Register/Login';
import {Routes,Route} from 'react-router-dom'
import ErrorPage from './Components/Error/ErrorPage';
import MainApp from './Components/Main/MainApp';
import { useRecoilState } from 'recoil';
import userData from './recoil/atom';
import currentData from './recoil/currentData';

function App() {

  const [dataAtom,setDataAtom] = useRecoilState(userData);
  const [currentRoom, setCurrentRoom] = useRecoilState(currentData);

  useEffect(()=>{
    socket.on('connect',()=>{
      console.log('connected to socket with :',socket.id)
    })
  },[])
   
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/main-app' element={<MainApp/>}/>
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </div>
  );
}
export default App;
