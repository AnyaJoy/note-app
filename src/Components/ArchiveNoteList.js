import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function NoteList(props) {
  return (
    <>
      {/* {noteData.map((item) => {
        return (
          <div key={item.id} className="note-wrapper">
            <img
              className={`archive-img-${!disabled}`}
              onClick={handleArchive}
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
          </div>
        );
      })} */}
    </>
  );
}
