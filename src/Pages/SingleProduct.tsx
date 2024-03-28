import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart as addToCartAction } from "../Store/Reducers/productSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import axios from "axios";
import "../App.css";
import { useDispatch } from "react-redux";
export const SingleProduct = () => {
  const [response, setResponse] = useState<any>([]);
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  console.log("product id on single product", id);
  useEffect(() => {
    const handleSingleProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        console.log("response from singleProductApi", res.data);
        setResponse(res.data);
        setResponse((ress: any) => ({ ...ress, quantity: 0 }));
        setLoad(false);
      } catch (error) {
        console.log("error from singleProduct", error);
      }
    };
    handleSingleProduct();
  }, [id]);
  const inc = () => {
    setResponse((prev: any) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };
  const dec = () => {
    setResponse((prev: any) => ({
      ...prev,
      quantity: Math.max(0, prev.quantity - 1),
    }));
  };
  const handleCart = () => {
    dispatch(addToCartAction(response));
    console.log("response is dispatched from SP-----");
    if (response.quantity <= 0) {
      const errorToast = toast.error("Please Enter Valid Quantity");
      setTimeout(() => {
        toast.dismiss(errorToast);
      }, 1300);
    } else {
      const successToast = toast.success("Product Added to Cart");
      setTimeout(() => {
        toast.dismiss(successToast);
      }, 1300);
    }
  };
  if (load) {
    return (
      <div>
        <h1>Loading......</h1>
      </div>
    );
  }
  const handleCheckOut = () => {
    navigate("/CheckOut");
  };
  return (
    <>
      <ToastContainer style={{ width: 340 }} />
      <Card style={{ width: "35rem", height: "70rem", marginTop: "1%" }}>
        <Card.Img variant="top" className="CardImgg" src={response.images[0]} />
        <Card.Body style={{ marginTop: "1%" }}>
          <Card.Title>
            <h2>Title:{response.title}</h2>
          </Card.Title>
          <Card.Title>
            <h3>Price:{response.price}</h3>
          </Card.Title>
          <Card.Title>
            <h4>In Stock:{response.stock}</h4>
          </Card.Title>
          <Card.Text style={{ marginLeft: "-1%" }}>
            <b>Description:-</b>
            {response.description}A "smart product" typically refers to a device
            or appliance that incorporates connectivity to the internet (IoT -
            Internet of Things) or other devices, allowing it to collect and
            exchange data, and often enabling remote control or automation
            features. Smart products can range from everyday household items
            like thermostats and light bulbs to more complex devices like home
            security systems and wearable technology. IoT, or the Internet of
            Things, refers to the network of interconnected devices that
            communicate and exchange data with each other over the internet.
            These devices can include sensors, appliances, vehicles, and more,
            all equipped with the ability to collect and transmit data for
            various purposes, such as monitoring, analysis, and automation.
          </Card.Text>
          <Card.Text style={{ marginTop: "1rem" }}>
            <Button
              variant="danger"
              style={{ marginRight: "2rem" }}
              onClick={handleCart}
            >
              Add To Cart
            </Button>
            <Button variant="warning" onClick={dec}>
              <RemoveIcon />
            </Button>
            <b>Quantity:{response.quantity}</b>
            <Button variant="warning" onClick={inc}>
              <AddIcon />
            </Button>
            <Button
              variant="warning"
              style={{ marginLeft: "5%" }}
              onClick={handleCheckOut}
            >
              <ShoppingCartCheckoutIcon />
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
