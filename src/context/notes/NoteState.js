
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host ="http://localhost:5000"
 const notesInitial = [ ]
    /*const s1 = {
        "name" : "harry" ,
        "class" : "5b"
    }
    const [state , setState] = useState(s1);
  const  update = () => {
        setTimeout(() => {
            setState({
                "name" : "masih" ,
                "class" : "11a"
            
            })
        } , 1000)
    }
 return(
    <NoteContext.Provider value ={{state , update}}>
       {props.children}
    </NoteContext.Provider>
 )*/
 const [notes , setNotes] = useState(notesInitial)

 //GET ALL NOTES
 const getNotes = async() => {
  //api call
  const response = await fetch (`${host}/api/notes/fetchallnotes` ,
  {
 method: "GET",
 headers: {
   "Content-Type":"application/json",
   "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZTc5NDViN2I3OTU3MzQ2MzAzNDE3In0sImlhdCI6MTY5OTY3NzAxOX0.3eN_PLVwKpoqtcZZeyR_sapc0RZuw-6sQhK_ngdrlag"
 }
 });
 const json = await response.json();
 console.log(json)
 setNotes(json)
}
 //ADD A NOTE
 const addNote = async(titles, description, tag) => {
  //api call
  const response = await fetch(`${host}/api/notes/addnotes`,
  {
 method: "POST",
 headers: {
   "Content-Type": "application/json",
   "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZTc5NDViN2I3OTU3MzQ2MzAzNDE3In0sImlhdCI6MTY5OTY3NzAxOX0.3eN_PLVwKpoqtcZZeyR_sapc0RZuw-6sQhK_ngdrlag"
 },
    body: JSON.stringify({ titles , description , tag}),
 });
 const note = await response.json();
 setNotes(notes.concat( note ))}

   
 //DELETE A NOTES
 const deleteNote = async(id) => {
  const response = await fetch(`${host}/api/notes/deletenotes/${id}`,
  {
 method: "DELETE",
 headers: {
   "Content-Type": "application/json",
   "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZTc5NDViN2I3OTU3MzQ2MzAzNDE3In0sImlhdCI6MTY5OTY3NzAxOX0.3eN_PLVwKpoqtcZZeyR_sapc0RZuw-6sQhK_ngdrlag"
 }
 });
 const json = response.json();
 console.log(json);
  console.log("deleting the notes with id " + id);
   const newNotes = notes.filter((notes) => { return notes._id !== id})
  setNotes(newNotes)
 }
 //EDIT A NOTE
 const editNote = async(id , title , description ,tag) => {
  //API Call
 const response = await fetch(`${host}/api/notes/updatenotes/${id}`,
   {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "auth-token" :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZTc5NDViN2I3OTU3MzQ2MzAzNDE3In0sImlhdCI6MTY5OTY3NzAxOX0.3eN_PLVwKpoqtcZZeyR_sapc0RZuw-6sQhK_ngdrlag"
  },
     body: JSON.stringify({ title, description , tag}),
  });

  const json = await response.json();
  console.log(json)
  let newNotes = JSON.parse(JSON.stringify(notes))
  //logic to edit in client
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }
   
  }
  setNotes(newNotes);
 }
 return(
    <NoteContext.Provider value ={{notes , addNote,deleteNote,editNote ,getNotes}}>
       {props.children}
    </NoteContext.Provider>
 )
}


export default NoteState;