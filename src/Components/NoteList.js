import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";

//styles for modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

//binding modal
Modal.setAppElement("#root");

export default function NoteList(props) {
  //recieves props
  const {
    noteData,
    setNoteData,
    title,
    setTitle,
    note,
    setNote,
    disabled,
    setDisabled,
    archiveNoteData,
    setArchiveNoteData,
  } = props;

  //editing button
  const [editDisabled, setEditDisabled] = useState(true);

  //setting states for Modal
  const [noteModal, setNoteModal] = useState();
  const [titleModal, setTitleModal] = useState();
  const [dateModal, setDateModal] = useState();
  const [idModal, setIdModal] = useState();
  const [titleInput, setTitleInput] = useState("");
  const [noteInput, setNoteInput] = useState("");

  //deleting an object from notes Array on button click
  const handleDelete = (e) => {
    console.log(e.target.value)
    const result = window.confirm("Are you sure you want to delete your note?");
    if (result) {
      let newNoteData = noteData.filter((item) => {
        return item.id !== e.target.value;
      });
      setNoteData(newNoteData);
    }
  };

  //modal
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(e) {
    setIsOpen(true);
    //disabling the delete button and archive button
    setDisabled(true);
    //disabling the edit button
    setEditDisabled(false);

    //passing info into modal
    let id = e.target.value;
    var obj = noteData.find((obj) => obj.id === id);
    setNoteModal(obj.note);
    setTitleModal(obj.title);
    setDateModal(obj.date);
    setIdModal(id);
  }

  function closeModal() {
    setIsOpen(false);
    setDisabled(false);
    //disabling the edit button
    setEditDisabled(false);
  }

  //storing modal inputs
  function handleTitleInput(e) {
    setTitleInput(e.target.value);
  }
  function handleNoteInput(e) {
    setNoteInput(e.target.value);
  }

  //enabling the edit button
  useEffect(() => {
    if (noteModal !== "") {
      setEditDisabled(false);
    } else {
      setEditDisabled(true);
    }
    if (noteInput !== "") {
      setEditDisabled(false);
    } else {
      setEditDisabled(true);
    }
    if (titleInput == titleModal) {
      setEditDisabled(false);
    } else {
      setEditDisabled(true);
    }
  }, [titleInput]);

  useEffect(() => {
    if (noteInput !== "" && noteInput !== noteModal) {
      setEditDisabled(true);
    } else {
      setEditDisabled(false);
    }
  }, [noteInput]);

  //editing the note on modal
  function handleEdit(e) {
    //searching for the note object
    let oldObject = noteData.find((element) => element.id == e.target.value);
    //making a date stamp
    const date = new Date();
    const formattedDate = date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    //updating the object
    let updatedObject = {
      id: oldObject.id,
      note: oldObject.note,
      title: oldObject.title,
      date: formattedDate,
    };

    if (noteInput !== "") {
      updatedObject.note = noteInput;
    }
    if (titleInput !== "") {
      updatedObject.title = titleInput;
    }
    if (noteInput !== "" && titleInput !== "") {
      updatedObject.note = noteInput;
      updatedObject.title = titleInput;
    }
    if (noteInput == "" && titleInput == "" && noteModal !== "") {
      updatedObject.note = noteModal;
      updatedObject.title = "";
    }

    //changing the old object to an updated object
    const index = noteData.findIndex((emp) => emp.id === e.target.value),
      updatedNoteData = [...noteData];
    updatedNoteData[index] = updatedObject;
    setNoteData(updatedNoteData);

    //closing the modal, clearing storages, disabling the edit button
    closeModal();
    setEditDisabled(true);
    setTitleInput("");
    setNoteInput("");
  }

  //archivating the object
  const handleArchive = (e) => {
    const result = window.confirm("Are you sure you want to archivate your note?");
    if (result) {
      var obj = noteData.find(obj => obj.id === e.target.value);
      setArchiveNoteData(prevNotes => {
          return [obj, ...prevNotes]
        })
      let newNoteData = noteData.filter((item) => {
        return item.id !== e.target.value;
      });
      setNoteData(newNoteData);
    }
  };

 

  return (
    <>
      {noteData.map((item) => {
        return (
          <div key={item.id} className="note-wrapper">
            <button className={`archive-button-${!disabled}`}
            onClick={handleArchive}
            value={item.id}
            ></button>
            <img
              className="archive-img"
              src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-archive-office-stationery-justicon-flat-justicon.png"
            />
            {item.title && <div className="title">{item.title}</div>}
            <div className="note-title">{item.note}</div>
            <div className="date-delete-wrapper">
              <div className="date">{item.date}</div>
              <button
                onClick={handleDelete}
                className={`delete-button-${!disabled}`}
                disabled={disabled}
                value={item.id}
              >
                Delete
              </button>
            </div>

            <div className="modal">
              <button
                className="modal-button"
                value={item.id}
                onClick={openModal}
                src="https://img.icons8.com/cute-clipart/64/000000/edit.png"
              ></button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <button className="close-button" onClick={closeModal}>
                  х
                </button>
                <div>
                  <br></br>
                </div>
                <textarea onChange={handleTitleInput} className="title-modal">
                  {titleModal}
                </textarea>
                <textarea onChange={handleNoteInput} className="note-modal">
                  {noteModal}
                </textarea>
                <div className="date-delete-wrapper-modal">
                  <div className="date-modal">{dateModal}</div>
                  <button
                    onClick={handleEdit}
                    value={idModal}
                    disabled={!editDisabled}
                    className={`edit-button-modal-${editDisabled}`}
                  >
                    Edit
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        );
      })}
    </>
  );
}
