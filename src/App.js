 import { useState } from 'react';
import './App.css';
import {
BrowserRouter , Routes , Route
}from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';




function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert ={alert}/>
   <div className= "container">
    <Routes>
      <Route exact path= "/" element={<Home showAlert = {showAlert}/>}></Route>
      <Route exact path= "/Aboutus" element={<Aboutus/>}> </Route>
      <Route exact path="/Login" element={<Login showAlert = {showAlert}/>}> </Route>
      <Route exact path="/Signup" element={<Signup showAlert = {showAlert}/>}> </Route>
      
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
