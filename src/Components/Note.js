import React from 'react';
import { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import { useRef } from 'react';


export default function Note (props) {
    //recieving props
    const { note, setNote, setNoteData, title, setTitle, setInputChecker, inputChecker} = props;

    //storing note and title inputs
    const noteTextRef = useRef();
    const titleTextRef = useRef();

    function handleNoteInput(e) {setNote(noteTextRef.current.value)}
    function handleTitleInput(e) {setTitle(titleTextRef.current.value)}

    //enabling the add button
    useEffect(() => {
        if (noteTextRef.current.value == "") {setInputChecker(false)} else {setInputChecker(true)}
    }, [note])

    //handling the AddNote button click
    function handleAddNote() {
        //creates and format the date
        const date = new Date();
        const formattedDate = date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
        });

        //adding new object to the array of notes
        setNoteData(prevNotes => {
          return [{id: uniqid(), note: note, title: title, date: formattedDate}, ...prevNotes]
        })

        //emptying the input fields and storages
        noteTextRef.current.value = null;
        titleTextRef.current.value = null;
        setTitle("");
        setNote("");
    }

    //setting auto resize on textarea
    const setResizeAuto = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
    }
      

    //returning title, note inputs and a submit button
    return (
        <>
            <div><input  onChange={handleTitleInput} ref={titleTextRef} type="text" className="input-title-field" placeholder="Title"/></div>
            <div><textarea onChange={handleNoteInput} ref={noteTextRef} onKeyDown={setResizeAuto} className="input-text-field" placeholder="Your note..."/></div>
            <button onClick={handleAddNote} disabled={!inputChecker} className={`add-button-${inputChecker}`}>Add</button>
        </>
    )
}
