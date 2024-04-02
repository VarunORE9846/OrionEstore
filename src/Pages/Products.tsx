import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Circles } from "react-loader-spinner";
interface Products {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string[];
  quantity: number;
}
// interface CartItem {
//   product: Products;
//   quantity: [];
// }

export const Products = () => {
  const [response, setResponse] = useState<any>([]);
  const [currentRecords, setCurrentRecords] = useState<any>([]);
  const [totalProducts, setTotalProducts] = useState<any>(70);
  const [productsPerPage, setProductsPerPage] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [product, setProduct] = useState<any>("");
  const [show, setShow] = useState<boolean>(true);
  const [load, setLoad] = useState(false);
  const indexOfLastRecord = currentPage * productsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - productsPerPage;
  // const currentRecords: [] = response.slice(
  //   indexOfFirstRecord,
  //   indexOfLastRecord
  // );
  // console.log("current records------", currentRecords);
  const nPages = Math.ceil(totalProducts / productsPerPage);
  // const [productName, setProductName] = useState("");
  // const [cart, setCart] = useState<any>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    GetProducts();
  }, [currentPage]);

  const GetProducts = async () => {
    try {
      setLoad(true);
      const res = await axios.get(
        `https://dummyjson.com/products?limit=${totalProducts}`
      );
      const ress = res.data.products.map((response: any) => ({
        ...response,
        quantity: 0,
      }));
      // console.log("ress", ress);
      setResponse(ress);
      setCurrentRecords(response.slice(indexOfFirstRecord, indexOfLastRecord));
      // console.log("response", response);
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
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${product}`
      );
      console.log("response from product search api", res);
      if (res.status === 200) {
        setResponse(res.data.products);
        // setShow(false);
      }
    } catch (error) {
      console.log("error from search api", error);
    }
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
  const handleCategory = async (cat: string) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${cat}`
      );
      if (res.status === 200) {
        const ress = res.data.products.map((response: any) => ({
          ...response,
          quantity: 0,
        }));
        // console.log("category-------", ress);
        setResponse(ress);
        setCurrentRecords(
          response.slice(indexOfFirstRecord, indexOfLastRecord)
        );
      }
    } catch (error) {
      console.log("error from category Api", error);
    }
  };

  const inc = (productId: number) => {
    // const updatedResponse = [...response];
    // console.log(response, "response");
    // console.log(updatedResponse, "updatedResponse");
    // console.log(updatedResponse[7], "updatedResponse[31].quantity----");
    // if (updatedResponse[0]?.quantity >= 0) {
    //   console.log("quantity present", updatedResponse[0].quantity);
    //   updatedResponse[0].quantity++;
    //   setResponse(updatedResponse);
    // }
    const updatedResponse = response.map((item: Products) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setResponse(updatedResponse);
  };
  const dec = (ProductId: number) => {
    // const updatedResponse = [...response];
    // if (updatedResponse[index]?.quantity > 0) {
    //   updatedResponse[index].quantity--;
    //   setResponse(updatedResponse);
    // }
    const updatedResponse = response.map((item: Products) =>
      item.id === ProductId ? { ...item, quantity: item.quantity - 1 } : item
    );
    setResponse(updatedResponse);
  };
  const handleCheckOut = () => {
    navigate("/CheckOut");
  };
  const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    // console.log("Products Pagination Page number", value);
  };

  // useEffect(() => {
  //   console.log(response, "response change");
  // }, [response]);
  return (
    <>
      <ToastContainer style={{ width: 340 }} />
      <div>
        <h1 style={{ marginLeft: "40%", fontStyle: "italic" }}>
          List of Products
        </h1>
        <div className="form-group">
          <div className="Brandpanell">
            <label htmlFor="inputfield">
              <h4 style={{ fontStyle: "italic" }}>Product Name:</h4>
            </label>
          </div>
          <div className="Brandpanell">
            <input
              type="text"
              className="form-control"
              id="inputfield"
              placeholder="Search Product..."
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div className="Brandpanell">
            <button
              type="button"
              onClick={handleSearch}
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
          <Dropdown style={{ marginLeft: "90px" }}>
            <Dropdown.Toggle
              variant="success"
              className="form-control"
              id="dropdown-basic"
            >
              Category{" "}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCategory("smartphones")}>
                SmartPhone
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategory("laptops ")}>
                Laptops
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategory("Furniture")}>
                Furniture
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategory("home-decoration")}>
                HomeDecoration
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategory("groceries")}>
                Groceries
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="checkout">
          <Button size="lg" variant="warning" onClick={handleCheckOut}>
            <ShoppingCartCheckoutIcon />
          </Button>
        </div>
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

        {show && (
          <div className="Cardd">
            {response
              .slice(indexOfFirstRecord, indexOfLastRecord)
              .map((e: Products, i: number) => {
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
                          {e?.title.length <= 17
                            ? e?.title
                            : e?.title.slice(0, 16)}
                        </Card.Title>
                        <Card.Title
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          Price:<h5 style={{ color: "green" }}>$</h5>
                          {e?.price}
                        </Card.Title>
                        <Card.Title>Category:{e?.category}</Card.Title>
                        <Card.Title>
                          <h6>
                            <Link
                              to={`/SingleProduct/${e?.id}`}
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
                            onClick={() => dec(e?.id)}
                            // onClick={() => console.log("quant--------", e?.id)}
                            style={{ width: "2.5rem", height: "2rem" }}
                          >
                            <RemoveIcon />
                          </Button>
                          Quantity:{e?.quantity}
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => inc(e?.id)}
                            // onClick={() => console.log("quant--------", e?.id)}
                            style={{ width: "2.5rem", height: "2rem" }}
                          >
                            <AddIcon />
                          </Button>
                        </Card.Title>
                        <Card.Text>
                          <Button
                            size="lg"
                            variant="danger"
                            onClick={() => addToCart(e)}
                            
                          >
                            <ShoppingCartIcon/>
                          </Button>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <Stack style={{ marginTop: "7%", marginLeft: "78%" }} spacing={2}>
        <Pagination
          count={nPages}
          onChange={handlePagination}
          page={currentPage}
          color="secondary"
        />
      </Stack>
    </>
  );
};
