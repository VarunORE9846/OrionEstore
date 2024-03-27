import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart as addToCartAction } from "../Store/Reducers/productSlice";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Circles } from "react-loader-spinner";
// interface Products {
//   id: string;
//   title: string;
//   price: string;
//   images: string[];
// }
// interface CartItem {
//   product: Products;
//   quantity: [];
// }

export const Products = () => {
  const [response, setResponse] = useState<any>([]);
  const [load, setLoad] = useState(false);
  // const [productName, setProductName] = useState("");
  // const [cart, setCart] = useState<any>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    GetProducts();
  }, []);
  const GetProducts = async () => {
    try {
      setLoad(true);
      const res = await axios.get("https://dummyjson.com/products?limit=15");
      // const res = await axios.get("https://dummyjson.com/carts");
      const ress = res.data.products.map((response: any) => ({
        ...response,
        quantity: 0,
      }));
      console.log("ress", ress);
      setResponse(ress);
      console.log("response", response);
      setLoad(false);
    } catch (error) {
      console.log("error recieved", error);
    }
    //======================================================================================================
    // const payload = {
    //   keyword: "" || productName,
    //   pageNumber: 3,
    //   pageSize: 7,
    // };
    // Api.post("/v1/products/search", payload)
    //   .then((response) => {
    //     console.log("response from products API", response);
    //   })
    //   .catch((error) => {
    //     console.log("error from products API", error);
    //   });
  };
  const inc = (index: number) => {
    const updatedResponse = [...response];
    updatedResponse[index].quantity++;
    // updatedResponse[index].price*updatedResponse[index].quantity;
    setResponse(updatedResponse);
  };
  const dec = (index: number) => {
    const updatedResponse = [...response];
    updatedResponse[index].quantity--;
    // updatedResponse[index].price*updatedResponse[index].quantity;
    setResponse(updatedResponse);
  };
  const addToCart = (product: any) => {
    if (product.quantity > 0) {
      dispatch(addToCartAction(product));
      // toast.success("Product Added to Cart");
      const successToast = toast.success("Product Added to Cart");
      setTimeout(() => {
        toast.dismiss(successToast);
      }, 1300);
    } else {
      const errorToast = toast.error("Enter valid quantity");
      setTimeout(() => {
        toast.dismiss(errorToast);
      }, 1300);
    }
  };
  const handleCheckOut = () => {
    navigate("/CheckOut");
  };
  return (
    <>
      <ToastContainer style={{ width: 340 }} />
      <div>
        <h1>List of Products</h1>
        {load && (
          <div style={{ marginLeft: "50%", marginTop: "5%" }}>
            <Circles
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
        <div className="checkout">
          <Button size="lg" variant="warning" onClick={handleCheckOut}>
            <ShoppingCartCheckoutIcon />
          </Button>
        </div>
        <div className="Cardd">
          {response.map((e: any, i: number) => {
            return (
              <div className="Cards" key={i}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    className="CardImg"
                    src={e?.images[0]}
                  />
                  <Card.Body>
                    <Card.Title>
                      Title:
                      {e?.title.length <= 17 ? e?.title : e?.title.slice(0, 16)}
                    </Card.Title>
                    <Card.Title>Price:{e?.price}</Card.Title>
                    <Card.Title>
                      <h6>
                        <Link
                          to={`/Products/${e.id}`}
                          style={{ color: "green", textDecoration: "none" }}
                        >
                          Product Details
                        </Link>
                      </h6>
                    </Card.Title>
                    <Card.Title>
                      <Button
                        variant="success"
                        size="sm"
                        disabled={e?.quantity === 0}
                        onClick={() => dec(e?.id - 1)}
                      >
                        <RemoveIcon />
                      </Button>
                      Quantity:{e?.quantity}
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => inc(e?.id - 1)}
                      >
                        <AddIcon />
                      </Button>
                    </Card.Title>
                    <Card.Text>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => addToCart(e)}
                      >
                        Add to Cart
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
