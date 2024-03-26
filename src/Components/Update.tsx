import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Api from "../Components/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { brandData } from "../Store/Reducers/brandSlicee";
const Update = ({ toggle, handleClose, updateobj, setResponse }: any) => {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [newData, setNewData] = useState({ name: "", description: "" });
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setNewData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  //   console.log("new data----",newData);
  // };
  // const nameref=useRef(updateobj.name);
  // const descref=useRef(updateobj.description);
  const [newData, setNewData] = useState({
    name: updateobj.name,
    description: updateobj.description,
    id: updateobj.id,
  });
  useEffect(() => {
    if (updateobj) {
      setNewData({
        name: updateobj.name,
        description: updateobj.description,
        id: updateobj.id,
      });
    }
  }, [updateobj]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleUpdate = () => {
    const uid = updateobj.id;

    Api.put(`/v1/brands/${uid}`, newData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Data Updated successfully..............", response.data);
          setResponse((prevResponse: any) =>
            prevResponse.map((brand: any) =>
              brand.id === uid ? newData : brand
            )
          );
          const Updatee = toast.success("Item Updated Successfully");
          setTimeout(() => {
            toast.dismiss(Updatee);
          }, 1200);
          handleClose();
        }
      })
      .catch((error) => {
        // if (error.response && error.response.status === 403) {
        //   console.log("error from Api", error);
        //   const error1 = toast.error("User is Not Authorized");
        //   setTimeout(() => {
        //     toast.dismiss(error1);
        //   }, 1300);
        //   handleClose();
        // }
        // else{
        //   console.log("error from Update User Api-----",error)
        // }
        console.log("Error from Update Api", error);
        const error2 = toast.error("User is Not Authorized");
        setTimeout(() => {
          toast.dismiss(error2);
        }, 1300);
        handleClose();
      });
  };
  // console.log("update component------", toggle);
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
              placeholder="New Brand Name"
              onChange={handleChange}
              name="name"
              value={newData.name}
              // ref={nameref}
            />
            <input
              type="text"
              className="form-control"
              id="inputfield"
              placeholder="New Description"
              name="description"
              // ref={descref}
              value={newData.description}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Update;
