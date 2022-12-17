import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React from "react";
function CreateNoteButton({
  handleShow,
  handleClose,
  handleSaveAndClose,
  show,
  setModalBody,
  setModalTitle,
}) {
  const handleChange = (setter) => (e) => {
    e.preventDefault(); // prevent the default action
    setter(e.target.value); // set name to e.target.value (event)
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="CreateNoteButton"
      >
        Create Note
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="basic-url">Title</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={handleChange(setModalTitle)}
              placeholder="Add a title"
            />
          </InputGroup>
          <Form.Label htmlFor="basic-url">Body</Form.Label>
          <InputGroup>
            <Form.Control
              as="textarea"
              placeholder="Add a body"
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

export default CreateNoteButton;
