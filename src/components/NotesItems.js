import React  , {useContext}from 'react'
import noteContext from '../context/notes/noteContext';

const NotesItems = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
    const {Notes , updateNote} = props;
  return (
    <div className="col-md-3">
      <div class="card my-3" >
  <div class="card-body">
    <div className="d-flex align-item-center">
    <h5 class="card-title">{Notes.title}</h5>
    <i class="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(Notes._id);
      props.showAlert ("deleted successfully " , "success")}}></i>
    <i class="fa-solid fa-pen-to-square mx-3"  onClick={()=>{updateNote(Notes);
      }}></i>
   
    </div>
    <p class="card-text">{Notes.description}</p>
    
    
  </div>
</div>
    </div>
  )
}

export default NotesItems
