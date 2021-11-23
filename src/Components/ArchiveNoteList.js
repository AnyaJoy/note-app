import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function NoteList(props) {
  //recieves props
  const {
    noteData,
    setNoteData,
    disabled,
    setDisabled,
    archiveNoteData,
    setArchiveNoteData,
  } = props;

  const handleReturn = (e) => {
    const result = window.confirm(
      "Are you sure you want to unarchivate your note?"
    );
    if (result) {
      var obj = archiveNoteData.find((obj) => obj.id === e.target.value);
      setNoteData((prevNotes) => {
        return [obj, ...prevNotes];
      });

      let newArchiveNoteData = archiveNoteData.filter((item) => {
        return item.id !== e.target.value;
      });
      setArchiveNoteData(newArchiveNoteData);
    }
  };

  return (
    <>
      {archiveNoteData.map((item) => {
        return (
          <div key={item.id} className="note-wrapper">
            <button
              className="archive-button-true"
              onClick={handleReturn}
              value={item.id}
            ></button>
            <img
              className="archive-img"
              src="https://img.icons8.com/dusk/64/ffffff/return.png"
            />
            {item.title && <div className="title">{item.title}</div>}
            <div className="note-title">{item.note}</div>
            <div className="date-delete-wrapper">
              <div className="date">{item.date}</div>
              {/* <button
                onClick={handleDelete}
                className={`delete-button-${!disabled}`}
                disabled={disabled}
                value={item.id}
              >
                Delete
              </button> */}
            </div>
          </div>
        );
      })}
    </>
  );
}
