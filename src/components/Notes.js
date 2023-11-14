import React, { useContext, useEffect, useRef, useState } from "react";
import NotesItems from "./NotesItems";
import AddNotes from "./AddNotes";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem ('token')){
    getNotes();
    }
    else{ history.push ("/login")}
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refclose = useRef(null);
  const [notess, setNotes] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNotes) => {
    ref.current.click();

    setNotes({
      eid: currentNotes._id,
      etitle: currentNotes.title,
      edescription: currentNotes.description,
      etag: currentNotes.tag,
    });
  };

  const onChange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    console.log("updating the notes..", notess);
    editNote(notess.id, notess.etitle, notess.edescription, notess.etag);
    refclose.current.click();
    props.showAlert("updated credential", "primary");
  };

  return (
    <>
      <AddNotes showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalLong"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Notes
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={notess.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={notess.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={notess.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  notess.etitle.length < 5 || notes.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1> YOUR NOTES</h1>
        {notes.map((Notes) => {
          return (
            <NotesItems
              key={Notes._id}
              updateNote={updateNote}
              showAlert={props.showAlert}
              Notes={Notes}
            />
          );
        })}
      </div>
    </>
  );
};
export default Notes;
