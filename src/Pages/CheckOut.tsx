import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { RootState } from "../Store/RootState";
import { useSelector } from "react-redux";
import "../App.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
interface Product {
  id: string;
  title: string;
  price: string;
  images: string[];
  quantity: number;
}
export const CheckOut = () => {
  const [cartProduct, setCartProduct] = useState(
    useSelector((state: RootState) => state.product)
  );
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const handleTotal = () => {
      let total = cartProduct.items.reduce(
        (previousValue: number, currentValue: any) => {
          return previousValue + currentValue.quantity * currentValue.price;
        },
        0
      );
      console.log("total of products", total);
      setTotal(total);
    };
    handleTotal();
  }, [cartProduct.items]);
  const handleDelete = (del: string) => {
    setCartProduct((prevCartProduct: any) => ({
      ...prevCartProduct,
      items: prevCartProduct.items.filter((item: any) => item.id !== del),
    }));
  };
  return (
    <section className="h-100" id="checkk" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div
              className="d-flex justify-content-between align-items-center mb-4"
              id="shoppy"
            >
              <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                Shopping Cart
              </MDBTypography>
            </div>
            {cartProduct &&
              cartProduct.items.map((product: Product) => {
                return (
                  <MDBCard className="rounded-3 mb-4" key={product.id}>
                    <MDBCardBody className="p-4">
                      <MDBRow className="justify-content-between align-items-center">
                        <MDBCol md="2" lg="2" xl="2">
                          <MDBCardImage
                            className="rounded-3"
                            fluid
                            src={product.images[0]}
                            alt="Cotton T-shirt"
                          />
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="3">
                          <p className="lead fw-normal mb-2">{product.title}</p>
                          <p>
                            <span className="text-muted">Quantity:</span>M{" "}
                          </p>
                        </MDBCol>
                        <MDBCol
                          md="3"
                          lg="3"
                          xl="2"
                          className="d-flex align-items-center justify-content-around"
                        >
                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>

                          <MDBInput
                            min={0}
                            defaultValue={product.quantity}
                            type="number"
                            size="sm"
                          />

                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="plus"  />
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="3">
                          <MDBTypography tag="h5" className="mb-0" id="pricee">
                            <p className="lead fw-normal mb-2">Price:</p>
                            {product.price}
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol md="2" lg="2" xl="1">
                          <MDBTypography tag="h6" className="mb-0">
                            <Button onClick={() => handleDelete(product.id)}>
                              <DeleteIcon style={{ color: "red" }} />
                            </Button>
                          </MDBTypography>
                        </MDBCol>

                        <MDBCol md="1" lg="1" xl="1" className="text-end">
                          <a href="#!" className="text-danger">
                            <MDBIcon fas icon="trash text-danger" size="lg" />
                          </a>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                );
              })}
            <MDBCard className="mb-4">
              <MDBCardBody className="p-4 d-flex flex-row">
                <Button style={{ color: "green", fontSize: "extra-large" }}>
                  Total:{total}
                </Button>
              </MDBCardBody>
            </MDBCard>
            <div
              className="d-grid gap-2"
              style={{ width: 760, marginLeft: 320 }}
            >
              <button className="btn btn-success" type="button">
                Place Order
              </button>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
