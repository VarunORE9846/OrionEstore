import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Api from "../Components/Api";

// for delete and other crud operations
const Delete = ({ togglee, setResponse, del, setTogglee }: any) => {
  const handleClose = () => setTogglee(false);
  // const handleShow = () => setToggle(true);
  const handleDelete = () => {
    Api.delete(`/v1/brands/${del}`)
      .then((response) => {
        if (response && response.status === 200) {
          setResponse((prevResponse: any) =>
            prevResponse.filter((item: any) => item.id !== del)
          );
          const delfilter = toast.success("Item Deleted Successfully");
          setTimeout(() => {
            toast.dismiss(delfilter);
          }, 1200);
          console.log("updated or deleted response", response);
          handleClose();
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          const error1 = toast.error(
            "Conflict:cannot delete brand due to associated data"
          );
          setTimeout(() => {
            toast.dismiss(error1);
          }, 1300);
        } else if (error.response && error.response.status === 403) {
          console.log("error from delete", error);
          const error2 = toast.error("User Is Not Authorized");
          setTimeout(() => {
            toast.dismiss(error2);
          }, 1300);
        } else {
          const error3 = toast.error("User Is Not Authorized");
          setTimeout(() => {
            toast.dismiss(error3);
          }, 1300);
        }
      });
  };
  return (
    <>
      <Modal show={togglee} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "red" }}>
          Are You Sure You Want To Delete This Item ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Delete;
