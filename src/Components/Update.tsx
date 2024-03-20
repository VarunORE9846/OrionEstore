import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Update = ({ toggle ,handleClose,handleShow}: any) => {


  console.log("update component------", toggle);
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}/> */}

        <Modal show={toggle} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="inputfield"
                placeholder="Enter Brand Name"
                //   onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                id="inputfield"
                placeholder="Enter Description"
                //   onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      
    </>
  );
};

export default Update;
