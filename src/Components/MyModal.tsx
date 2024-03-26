import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Api from "../Components/Api";
import "../Components/Rp.css";

// interface Obj {
//   id: string;
//   name: string;
//   description: string;
// }
const MyModal = ({ response, setResponse }: any) => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [response, setResponse] = useState<Obj[]>([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd = () => {
    // try {
    //   const payload = {
    //     name: name || "",
    //     description: description || "",
    //   };
    //   const res = await Api.post("/v1/brands", payload);
    //   console.log("response from create brand api:",response)
    //   if (res.status === 200) {
    //     setResponse(res.data);
    //    const success= toast.success("Brand is created successfully");
    //    setTimeout(()=>{
    //       toast.dismiss(success);
    //    },1300);
    //    handleClose();
    //   }
    // } catch (error) {
    //   console.log("error from create brand is", error);
    //   toast.error("User is not authorized");
    // }
    const payload = {
      name: name || "",
      description: description || "",
    };

    Api.post("/v1/brands", payload)
      .then((resp) => {
        if (resp.status === 200) {
          //  setResponse(response.data);
          const newObj = {
            id: resp.data,
            name: name,
            description: description,
          };
          // const newResponsw = [...response]
          // newResponsw.push(newObj);
          // console.log("new response----",newResponsw);
          // setResponse(newResponsw)
          // setResponse((prevstate: any) => prevstate.push(newObj));
          setResponse((prevState: any) => [...prevState, newObj]);
          console.log("response from create api", response);
          // console.log("new object---", newObj);
          // console.log("create response------", resp.data);
          const success = toast.success("Brand is created successfully");
          setTimeout(() => {
            toast.dismiss(success);
          }, 1300);
          handleClose();
        }
      })
      .catch((error) => {
        console.log("error from create brand is", error);
        toast.error("User is not authorized");
      });
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
