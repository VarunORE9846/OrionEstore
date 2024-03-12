import { useEffect, useState } from "react";
import Api from "../Components/Api";
import MyModal from "../Components/MyModal";
import "../App.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Pagination } from "../Components/Pagination";
interface ND {
  name: string;
  description: string;
}

export const Brands = () => {
  const [Brand, setBrand] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(7);
  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [response, setResponse] = useState([]);
  // const currentRecords = response.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(response.length / recordsPerPage);
  useEffect(() => {
    handleBrand();
  }, [currentPage, recordsPerPage]);
  const callTen = () => {
    setRecordsPerPage(10);
  };
  const callTwenty = () => {
    setRecordsPerPage(20);
  };
  const handleBrand = async () => {
    try {
      const payload = {
        keyword: Brand || "",
        pageNumber: Brand === "" ? currentPage : setCurrentPage(1),
        pageSize: recordsPerPage,
      };
      const res = await Api.post("/v1/brands/search", payload);
      // setResponse(res.data.data);
      setResponse(res.data.data);
      console.log("response ", response);
    } catch (error) {
      console.error("Error from API:", error);
    }
  };
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
  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="form-group">
        <div className="Brandpanell">
          <label htmlFor="inputfield">
            <h4>Brand Name</h4>
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
        <div className="Brandpanel">{<MyModal />}</div>
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
              Amount
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
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

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
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Description</th>
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
    </>
  );
};
