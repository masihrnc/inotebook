
import './App.css';
import {
BrowserRouter , Routes , Route
}from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';


function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert message ="this is amazing react app"/>
   <div className= "container">
    <Routes>
      <Route exact path= "/" element={<Home/>}></Route>
      <Route exact path= "/Aboutus" element={<Aboutus/>}> </Route>
      <Route exact path= "/login" element={<login/>}> </Route>
      <Route exact path= "/signup" element={<signup/>}> </Route>
      
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
