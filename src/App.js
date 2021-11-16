import { useState, useRef, useEffect } from 'react';
import Note from './Components/Note';
import NoteList from './Components/NoteList';
import './App.css';
import logo from './Images//MainPic.jpeg';
import pen from './Images//pen.png';

const localStorageKey = 'noteApp.notes'



function App() {
//setting states
const [note, setNote] = useState();
const [title, setTitle] = useState();
const [noteData, setNoteData] = useState([]);
const [inputChecker, setInputChecker] = useState(false);

//loads noteData from local storage
useEffect(() => {
  const storedNotes = JSON.parse(localStorage.getItem(localStorageKey));
  if (storedNotes) setNoteData(storedNotes)
}, [])

//sends noteData to local storage
useEffect(() => {
  console.log(noteData)
  localStorage.setItem(localStorageKey, JSON.stringify(noteData))
}, [noteData]) 


  return (
      <div className="page-wrapper">
        <div className="content-wrapper">

          <div className="left-column">
            <div><img src={logo} className="img"/></div>
            <span className="header-idea">Write down your idea </span>
            <span><img src={pen} className="img-pen"/></span>
            <div className="input-wrapper">
              <Note 
              note={note}
              setNote={setNote}
              setNoteData={setNoteData}
              title={title}
              setTitle={setTitle}
              inputChecker={inputChecker}
              setInputChecker={setInputChecker}
              />
            </div>
          </div>

          <div className="right-column">
            <div className="header-notes">Notes</div>
              <div className="notesWrapper">
                <NoteList 
                  noteData={noteData}
                  setNoteData={setNoteData}
                  title={title}
                  setTitle={setTitle}
                  note={note}
                  setNote={setNote}
                />
              </div>
            </div>
          </div>         

      </div>
  );
}

export default App;
