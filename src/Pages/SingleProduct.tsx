import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export const SingleProduct = () => {
  const [response, setResponse] = useState([]);
  const { id } = useParams<{ id: string }>();
  console.log("product id on single product", id);
  useEffect(() => {
    const handleSingleProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        console.log("response from singleProductApi", res.data);
      } catch (error) {
        console.log("error from singleProduct", error);
      }
    };
    handleSingleProduct();
  }, []);
  return (
    <div>
      <h1>SingleProduct</h1>
    </div>
  );
};
