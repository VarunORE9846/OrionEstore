import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Api from "../Components/Api";
import "../Components/Rp.css";
const MyModal = () => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd = async () => {
    try {
      const payload = {
        name: name || "",
        description: description || "",
      };
      const res = await Api.post("/v1/brands", payload);
      setResponse(res.data);
      console.log("response from create brand api:",response)
      if (res.status === 200) {
       const success= toast.success("Brand is created successfully");
       setTimeout(()=>{
          toast.dismiss(success);
       },1300);
      }
    } catch (error) {
      console.log("error from create brand is", error);
      toast.error("User is not authorized");
    }
    console.log("Response from Api", response);
  };
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Create
      </Button>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="inputfield"
              placeholder="Enter Brand Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              id="inputfield"
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAdd}>
            Save
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          {/* You can add additional buttons here */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyModal;
