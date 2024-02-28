import React, { ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import  { JwtPayload } from "jsonwebtoken";
import "../Components/Profile.css";
// interface obj {
//   id: string;
//   accessToken: string;
//   refreshToken: string;
// }
// interface DT {
//   fullName: string | null | JwtPayload;
// }
interface DT{
  user: JwtPayload | null;
}

export const Profile: React.FC = () => {
  const [user, setUser] = useState<ReactNode | DT>();
  useEffect(() => {
    const data = localStorage.getItem("Loggedinuser");
    if (data) {
      const user = JSON.parse(data);
      const decode = jwtDecode(user.accessToken);
       setUser(decode as DT | ReactNode);
    }
  }, []);
console.log("user details",user);
return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className="card p-3 py-4">
            <div className="text-center">
              <img
                src="https://i.imgur.com/bDLhJiP.jpg"
                width="100"
                className="rounded-circle"
                alt=""
              />
            </div>

            <div className="text-center mt-3">
              <span className="bg-secondary p-1 px-4 rounded text-white">
                Pro
              </span>
              <h5 className="mt-2 mb-0">{JSON.stringify(user)}</h5>
              <span>MERN STACK Developer</span>

              <div className="px-4 mt-1">
                <p className="fonts">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
              </div>
              <div className="px-4 mt-1">
                <p className="fonts">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
              </div>
              <div className="px-4 mt-1">
                <p className="fonts">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
              </div>
              <ul className="social-list">
                <li>
                  <i className="fa fa-facebook"></i>
                </li>
                <li>
                  <i className="fa fa-dribbble"></i>
                </li>
                <li>
                  <i className="fa fa-instagram"></i>
                </li>
                <li>
                  <i className="fa fa-linkedin"></i>
                </li>
                <li>
                  <i className="fa fa-google"></i>
                </li>
              </ul>

              <div className="buttons">
                <button className="btn btn-outline-primary px-4">
                  Message
                </button>
                <button className="btn btn-primary px-4 ms-3">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
