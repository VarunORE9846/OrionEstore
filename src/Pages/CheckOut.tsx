
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
interface Product {
  id: string;
  title: string;
  price: string;
  images: string[];
  quantity: number;
}
export const CheckOut = () => {
  const cartProduct = useSelector((state: RootState) => state.product);
  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className="d-flex justify-content-between align-items-center mb-4" id="shoppy">
              <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                Shopping Cart
              </MDBTypography>
              {/* <div>
                <p className="mb-0">
                  <span className="text-muted">Sort by:</span>
                  <a href="#!" className="text-body">
                    price <i className="fas fa-angle-down mt-1"></i>
                  </a>
                </p>
              </div> */}
            </div>
            {cartProduct.items.map((product: Product) => {
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
                          <MDBIcon fas icon="plus" />
                        </MDBBtn>
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3">
                      <MDBTypography tag="h5" className="mb-0" id="pricee">
                        <p className="lead fw-normal mb-2">Price:</p>
                          {product.price}
                        </MDBTypography>
                      </MDBCol>
                      {/* <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                        <MDBTypography tag="h5" className="mb-0">
                          {product.price}
                        </MDBTypography>
                      </MDBCol> */}
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
                <MDBInput
                  label="Discound code"
                  wrapperClass="flex-fill"
                  size="lg"
                />
                <MDBBtn className="ms-3" color="warning" outline size="lg">
                  Apply
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>

            <MDBCard>
              <MDBCardBody>
                <MDBBtn className="ms-3" color="warning" block size="lg">
                  Place Order
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
