import { useEffect, useState } from "react";
import Api from "../Components/Api";
import MyModal from "../Components/MyModal";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import "../App.css";
import Dropdown from "react-bootstrap/Dropdown";
// import { Pagination } from "../Components/Pagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { brandData as brandDataAction } from "../Store/Reducers/brandSlicee";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateIcon from "@mui/icons-material/Create";
import Update from "../Components/Update";
import Delete from "../Components/Delete";
import { FidgetSpinner } from "react-loader-spinner";
interface ND {
  id: string;
  name: string;
  description: string;
}

export const Brands = () => {
  const [toggle, setToggle] = useState(false);
  const [togglee, setTogglee] = useState(false);
  const [Brand, setBrand] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(7);
  const [totalCount, setTotalCount] = useState(0);
  const [del, setDel] = useState("");
  const [update, setUpdate] = useState({ id: "", name: "", description: "" });
  const dispatch = useDispatch();
  const [loadshow, setLoadShow] = useState(false);
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [response, setResponse] = useState([]);
  // const currentRecords = response.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(totalCount / recordsPerPage);
  const callTen = () => {
    setRecordsPerPage(10);
  };
  const callTwenty = () => {
    setRecordsPerPage(20);
  };
  useEffect(() => {
    handleBrand();
  }, [currentPage, recordsPerPage]);
  useEffect(() => {
    dispatch(brandDataAction(bres as ND));
  }, [response, dispatch]);
  const handleBrand = async () => {
    try {
      const payload = {
        keyword: Brand || "",
        pageNumber: Brand === "" ? currentPage : setCurrentPage(1),
        pageSize: recordsPerPage,
        // totalCount:22,
      };
      setLoadShow(true);
      const res = await Api.post("/v1/brands/search", payload);
      setResponse(res.data.data);
      setTotalCount(res.data.totalCount);
      setLoadShow(false);
    } catch (error) {
      console.error("Error from API:", error);
    }
    console.log("response------", response);
  };
  const bres: any = response;
  const AscSort = () => {
    const copyArray = [...response];
    const sort = copyArray.sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );
    setResponse(sort);
    console.log("Ascending sort", sort);
  };
  const DscSort = () => {
    const copyArray = [...response];
    //  const dsort=copyArray.reverse();
    const dsort = copyArray.sort((a: any, b: any) =>
      b.name.localeCompare(a.name)
    );
    setResponse(dsort);
    console.log("Dscending sort", dsort);
  };
  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    console.log("page value", value);
  };
  const handleDelete = (Id: string) => {
    // const params = { id: Id };
    setTogglee(true);
    setDel(Id);
  };
  const handleModal = (Id: string, uname: string, udescription: string) => {
    setUpdate({
      id: Id,
      name: uname,
      description: udescription,
    });
    setToggle(true);
    console.log("value of toggle", toggle);
  };
  const handleClose = () => setToggle(false);
  const handleShow = () => setToggle(true);

  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <Update
        toggle={toggle}
        handleClose={handleClose}
        handleShow={handleShow}
        updateobj={update}
        setResponse={setResponse}
      />
      <Delete
        togglee={togglee}
        setResponse={setResponse}
        setTogglee={setTogglee}
        del={del}
      />
      <div className="form-group">
        <div className="Brandpanell">
          <label htmlFor="inputfield">
            <h4>Brand Name:</h4>
          </label>
        </div>
        <div className="Brandpanell">
          <input
            type="text"
            className="form-control"
            id="inputfield"
            placeholder="Enter Brand Name"
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="Brandpanell">
          <button
            type="button"
            onClick={handleBrand}
            className="btn btn-primary"
          >
            Search
          </button>
        </div>

        <div className="Brandpanel">
          {<MyModal response={response} setResponse={setResponse} />}
        </div>
        <div className="Brandpanel">
          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
              Order
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={AscSort}>
                Ascending{" "}
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={DscSort}>
                Descending{" "}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="Brandpanel">
          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              Quantity
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-3" onClick={callTen}>
                10 Records
              </Dropdown.Item>
              <Dropdown.Item href="#/action-4" onClick={callTwenty}>
                20 Records
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* </form> */}

      <section className="intro">
        <div className="bg-image h-auto" style={{ backgroundColor: "#f5f7fa" }}>
          <div className="mask d-flex align-items-center h-auto">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="card shadow-2-strong">
                    <div className="card-body p-0">
                      <div
                        className="table-responsive table-scroll"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "auto" }}
                      >
                        <table className="table table-dark mb-0">
                          <thead style={{ backgroundColor: "#393939" }}>
                            <tr className="text-uppercase text-success">
                              {loadshow && (
                                <FidgetSpinner
                                  visible={true}
                                  height="80"
                                  width="80"
                                  ariaLabel="fidget-spinner-loading"
                                  wrapperStyle={{}}
                                  wrapperClass="fidget-spinner-wrapper"
                                />
                              )}
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
                              <th scope="col">Delete</th>
                              <th scope="col">Update</th>
                            </tr>
                          </thead>

                          {response &&
                            response.map((e: ND, i) => {
                              return (
                                <tbody key={i}>
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>{e.name}</td>
                                    <td>{e.description}</td>
                                    <td>
                                      <Button
                                        onClick={() => handleDelete(e.id)}
                                      >
                                        <DeleteIcon style={{ color: "red" }} />
                                      </Button>
                                    </td>
                                    <td>
                                      <Button
                                        onClick={() =>
                                          handleModal(
                                            e.id,
                                            e.name,
                                            e.description
                                          )
                                        }
                                      >
                                        <CreateIcon
                                          style={{ color: "green" }}
                                        />
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Stack className="Pagination" spacing={2}>
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
