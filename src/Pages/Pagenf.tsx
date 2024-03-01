import React from "react";
import '../Components/Rp.css';
export const Pagenf:React.FC = () => {
  return (
    <div className="card" style={{width: "38rem"}}>
    <img src="https://as1.ftcdn.net/v2/jpg/01/01/89/46/1000_F_101894688_RVSZUtDfPR6Cr5eBDQI7Qo5pZ01jmyK3.jpg" className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title" id="red">ERROR: 404</h5>
      <p className="card-text">Please Find Your Way out via routes given below!</p>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">Thank You</li>
    </ul>
    <div className="card-body">
      <a href="/Login" className="card-link">Login</a>
      <a href="/Home" className="card-link">Home</a>
    </div>
  </div>
  );
};
