import React from "react";
import '../Components/Rp.css';
export const Redirect = () => {
  return (
    <div className="card" style={{width: "38rem"}}>
    <img src="https://as2.ftcdn.net/v2/jpg/01/41/59/19/1000_F_141591993_ZjxESyCm2HKJ70BVKYVULa89a3neX0lw.jpg" className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">You Have Logged Out!</h5>
      <p className="card-text">Thank you for visiting our website!Have A Wonderful Day Ahead</p>
    </div>
    <ul className="list-group list-group-flush">
      <li className="list-group-item">Developed by:</li>
      <li className="list-group-item">Varun Dev Sharma</li>
    </ul>
    <div className="card-body">
      <a href="/Login" className="card-link">Login</a>
      <a href="/Home" className="card-link">Home</a>
    </div>
  </div>
  );
};
