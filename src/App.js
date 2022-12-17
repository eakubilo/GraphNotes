import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CreateNoteButton from "./CreateNoteButton";
import React, { useState } from "react";
import Note from "./Note";
import { useEffect, useRef } from "react";

function App() {
  // The notes array stores the position, styles, and id of each note
  const [notes, setNotes] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragging, setDragging] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);
  const [lastClicked, setLastClicked] = useState(null);
  const [drag, setDrag] = useState({ isDragging: false, dragging: null });
  const [dragged, setDragged] = useState(false);
  const isDraggingRef = useRef(isDragging);
  const draggingRef = useRef(dragging);
  const lastClickedRef = useRef(lastClicked);
  const notesRef = useRef(notes);
  const draggedRef = useRef(dragged);
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      handleMove(e);
    });
    window.addEventListener("mouseup", () => handleMouseUp());

    // This function will be called when the component is first rendered
  }, []); // Pass an empty array as the second argument to only run this effect on the first render

  // Create a new note object with an id, position, and styles
  const handleSaveAndClose = () => {
    // Initial position of the note
    const initialX = 0;
    const initialY = 0;

    // Create a new note object with an id, position, styles, title, and body
    const note = {
      component: (
        <Note
          id={notes.length}
          initialTitle={modalTitle}
          initialBody={modalBody}
          draggingRef={draggingRef}
          draggedRef={draggedRef}
        />
      ),
      id: notes.length,
      styles: {
        left: initialX,
        top: initialY,
      },
    };

    // Add the new note to the notes array
    setNotes([...notes, note]);
    notesRef.current = [...notes, note];
    handleClose();
  };

  const handleMove = (e) => {
    if (isDraggingRef.current) {
      const note = notesRef.current[draggingRef.current];
      // Create a new object to store the updated position
      const dx = e.clientX - lastClickedRef.current.x;
      const dy = e.clientY - lastClickedRef.current.y;
      const updatedPosition = {
        left: note.styles.left + dx,
        top: note.styles.top + dy,
      };

      const updatedNote = {
        ...note,
        styles: updatedPosition,
      };

      // Update the notes array with the updated note object
      setNotes([
        ...notesRef.current.map((n) => (n.id === note.id ? updatedNote : n)),
      ]);
      notesRef.current = [
        ...notesRef.current.map((n) => (n.id === note.id ? updatedNote : n)),
      ];
      setLastClicked({ x: e.clientX, y: e.clientY });
      lastClickedRef.current = { x: e.clientX, y: e.clientY };
      draggedRef.current = true;
      setDragged(true);
      requestAnimationFrame(() => handleMove(e, note));
    }
  };

  const handleMouseDown = (e, note) => {
    // Store the initial position of the mouse
    console.log("Fired!");

    setIsDragging(true);
    setDragging(note.id);
    setInitialPosition({ x: e.clientX, y: e.clientY });
    setLastClicked({ x: e.clientX, y: e.clientY });
    isDraggingRef.current = true;
    draggingRef.current = note.id;
    lastClickedRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragging(null);
    setLastClicked(null);
    setDragged(false);
    isDraggingRef.current = false;
    draggingRef.current = null;
    lastClickedRef.current = null;
    draggedRef.current = false;
  };

  return (
    <>
      <CreateNoteButton
        handleShow={handleShow}
        handleClose={handleClose}
        handleSaveAndClose={handleSaveAndClose}
        show={show}
        setModalBody={setModalBody}
        setModalTitle={setModalTitle}
      />
      {notes.map((note, index) => {
        // Create a function that updates the position of a note
        return (
          <div
            className="Note"
            // onMouseMove={(e) => {
            //   if (isDragging && dragging == index) {
            //     handleMove(e, note);
            //   }
            //   setLastClicked({ x: e.clientX, y: e.clientY });
            // }}
            onMouseDown={(e) => handleMouseDown(e, note)}
            onMouseUp={handleMouseUp}
            style={note.styles}
          >
            {note.component}
          </div>
        );
      })}
    </>
  );
}

export default App;
