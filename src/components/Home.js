import React from 'react'
import Notes from './Notes'
import noteContext from '../context/notes/noteContext';


export const  Home = (props) => {
 const {showAlert} = props
  return (
    <div>
      
      <Notes showAlert = {showAlert}/>
    </div>
)
}
export default Home

