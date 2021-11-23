import { useState, useRef, useEffect } from "react";
import Note from "./Components/Note";
import NoteList from "./Components/NoteList";
import "./App.css";
import logo from "./Images//MainPic.jpeg";
import pen from "./Images//pen.png";
import localforage from "localforage";
import ArchiveNoteList from "./Components/ArchiveNoteList";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";


function App() {
  //setting states
  const [note, setNote] = useState();
  const [title, setTitle] = useState();
  const [noteData, setNoteData] = useState([]);
  const [archiveNoteData, setArchiveNoteData] = useState([]);
  const [inputChecker, setInputChecker] = useState(false);
  //dropdown selection
  const [notesSelected, setNotesSelected] = useState(true);
  const [archiveSelected, setArchiveSelected] = useState(false);

  //disabling delete button on notes when Modal is open
  const [disabled, setDisabled] = useState(false);

  const notesStorageKey = "notesStorageKey";
  const archiveStorageKey = "archiveStorageKey";
  //loads data from local forage
  useEffect(() => {
    localforage.getItem("notesStorageKey", function (err, value) {
      if (value) setNoteData(value);
    });
    localforage.getItem("archiveStorageKey", function (err, value) {
      if (value) setArchiveNoteData(value);
    });
  }, []);

  //sends notes to local forage
  useEffect(() => {
    localforage
      .setItem("notesStorageKey", noteData)
      .then(function (value) {})
      .catch(function (err) {
        console.log(err);
      });
  }, [noteData]);

   //sends archive to local forage
   useEffect(() => {
    localforage
      .setItem("archiveStorageKey", archiveNoteData)
      .then(function (value) {})
      .catch(function (err) {
        console.log(err);
      });
  }, [archiveNoteData]);

  //drowdow menu (selects if to show notes or archive)
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

  const handleSelectNotes = () => {
    setArchiveSelected(false);
    setNotesSelected(true);
    setIsOpen(false);
  };

  const handleSelectArchive = () => {
    setArchiveSelected(true);
    setNotesSelected(false);
    setIsOpen(false);
  };

  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <div className="left-column">
          <div>
            <img src={logo} className="img" />
          </div>
          <span className="header-idea">Write down your idea </span>
          <span>
            <img src={pen} className="img-pen" />
          </span>
          <div className="input-wrapper">
            <Note
              note={note}
              setNote={setNote}
              setNoteData={setNoteData}
              title={title}
              setTitle={setTitle}
              inputChecker={inputChecker}
              setInputChecker={setInputChecker}
              archiveNoteData={archiveNoteData}
              setArchiveNoteData={setArchiveNoteData}
            />
          </div>
        </div>

        <div className="right-column">
          <div className="header-notes-wrapper">
            {notesSelected && <span className="header-notes">Notes</span>}
            {archiveSelected && <span className="header-notes">Archive</span>}
            <span className="dropdown-header">
              <button {...buttonProps} className="dropdown-button">
                Show
              </button>
              <span className={`arrow-down-${isOpen}`}></span>
              <div className={isOpen ? "visible" : ""} role="menu">
                <div className="dropdown-option" onClick={handleSelectNotes}>
                  • Notes
                </div>
                <div className="dropdown-option" onClick={handleSelectArchive}>
                  • Archive
                </div>
              </div>
            </span>
          </div>
          <div className="notesWrapper">
            {notesSelected && (
              <NoteList
                noteData={noteData}
                setNoteData={setNoteData}
                title={title}
                setTitle={setTitle}
                note={note}
                setNote={setNote}
                archiveNoteData={archiveNoteData}
                setArchiveNoteData={setArchiveNoteData}
                disabled={disabled}
                setDisabled={setDisabled}
              />
            )}
            {archiveSelected && (
              <ArchiveNoteList
                noteData={noteData}
                setNoteData={setNoteData}
                archiveNoteData={archiveNoteData}
                setArchiveNoteData={setArchiveNoteData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
