import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditUpdate() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

    <>
      <Button variant="primary" onClick={handleShow}>
      <i style={{margin:"none"}} class="fa-solid fa-pen-to-square"></i>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to edit this registry 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>Accept</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUpdate;