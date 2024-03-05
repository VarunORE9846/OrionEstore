import { useEffect, useState } from "react";
import Api from "../Components/Api";
import "../App.css";
interface ND {
  name: string;
  description: string;
}
export const Brands = () => {
  const [Brand, setBrand] = useState<string>("");
  const [response, setResponse] = useState([]);

  useEffect(() => {
    handleBrand();
  }, []);

  const handleBrand = async () => {
    try {
      const payload = {
        keyword: Brand || "",
        // pageNumber: 2,
        // pageSize: 10,
      };
      const res = await Api.post("/v1/brands/search", payload);
      setResponse(res.data.data);
    } catch (error) {
      console.error("Error from API:", error);
    }
  };
  console.log("====================================");
  console.log(response);
  console.log("====================================");
  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <div className="form-group">
        <label htmlFor="inputfield">Brand Name</label>
        <input
          type="text"
          className="form-control"
          id="inputfield"
          placeholder="Enter Brand Name"
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleBrand} className="btn btn-primary">
        Search
      </button>
      {/* </form> */}
      <section className="intro">
        <div className="bg-image h-100" style={{ backgroundColor: "#f5f7fa" }}>
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="card shadow-2-strong">
                    <div className="card-body p-0">
                      <div
                        className="table-responsive table-scroll"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "700px" }}
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
