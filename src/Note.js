import React, { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import Draggable from "react-draggable"; // The default
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

//A note is a card + a hidden modal
//App.js sets a note's initial content state
//Every note in general controls its own contents and modal
//App.js controls a note's position state in general
//type noteProps = {
//  initialTitle: String,
//  initialBody: String,
//  positionX: int,
//  positionY: int
//}
function Note({ initialTitle, initialBody }) {
  const [currTitle, setTitle] = useState(initialTitle);
  const [currBody, setBody] = useState(initialBody);
  const [modalTitle, setModalTitle] = useState(initialTitle);
  const [modalBody, setModalBody] = useState(initialBody);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSaveAndClose = () => {
    setTitle(modalTitle);
    setBody(modalBody);
    setShow(false);
  };
  const positionRef = useRef(null);
  const [lastDown, setLastDown] = useState(0);

  const handleChange = (setter) => (e) => {
    e.preventDefault(); // prevent the default action
    setter(e.target.value);
  };

  //We need a modal
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <div
          ref={positionRef}
          className="noteWrapper"
          onMouseDown={() => setLastDown(+new Date())}
          onMouseUp={() =>
            +new Date() - lastDown < 200 ? handleShow() : void 0
          }
          onClick={() => console.log(positionRef)}
        >
          <Card.Body>
            <Card.Title>{currTitle}</Card.Title>
            <Card.Text>{currBody}</Card.Text>
          </Card.Body>
        </div>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="basic-url">Title</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              value={modalTitle}
              onChange={handleChange(setModalTitle)}
            />
          </InputGroup>
          <Form.Label htmlFor="basic-url">Body</Form.Label>
          <InputGroup>
            <Form.Control
              as="textarea"
              value={modalBody}
              onChange={handleChange(setModalBody)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveAndClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Note;
