import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
export const Products = () => {
  const [response, setResponse] = useState<any>([]);
  useEffect(() => {
    GetProducts();
  }, []);
  const GetProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    setResponse(res.data.products);
    console.log("Response from API", response);
  };

  return (
    <div className="Movlmain">
      <h1>this is list of Products</h1>
      <div className="movie">
        {response.map((e: any, i: any) => {
          return (
            <div className="movies" key={i}>
              <img src={e?.images[0]} alt="" />
              <p>Title:{e?.title}</p>
              <p>Price:{e?.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
