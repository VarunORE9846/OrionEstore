import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "../Components/Profile.css";
interface Props {
  fullName: string;
}

export const Profile: React.FC = () => {
  const [user, setUser] = useState<Props | null>(null);
  useEffect(() => {
    const data = localStorage.getItem("Loggedinuser");
    if (data) {
      const user = JSON.parse(data);
      const decode = jwtDecode(user.accessToken);
      //  setUser(decode as DT | ReactNode);
      setUser(decode as Props);
    }
  }, []);
  console.log("user details", user);
  if (!user) {
    return <h5>Loading...</h5>;
  }

  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-18">
          <div className="card p-3 py-4">
            <div className="text-center">
              <img
                src="https://i.imgur.com/bDLhJiP.jpg"
                width="250"
                className="rounded-circle"
                alt=""
              />
            </div>

            <div className="text-center mt-3">
              <span className="bg-secondary p-1 px-4 rounded text-white">
                Pro
              </span>
              <h5 className="mt-2 mb-0">{user.fullName}</h5>
              <span>MERN STACK Developer</span>

              <div className="px-2 mt-1 ts-17">
                <p className="fonts">
                  Passionate React JS Developer with 10 years of experience in
                  building robust and responsive web applications. Proficient in
                  leveraging React JS, Redux, and other front-end technologies
                  to create dynamic user interfaces. Skilled in collaborating
                  with cross-functional teams to deliver high-quality solutions
                  that meet client requirements and enhance user experience.
                </p>
              </div>
              <div className="px-2 mt-1 ts-17">
                <p className="fonts">
                  Dedicated React JS developer with expertise in
                  creating dependable and adaptable online applications.
                  knowledgeable about using Redux, React JS, and other front-end
                  technologies to design interactive user interfaces. competent
                  in working with cross-functional teams to develop high-quality
                  solutions that improve user experience and satisfy customer
                  needs.
                </p>
              </div>
              <div className="px-2 mt-1 ts-17">
                <p className="fonts">
                  Dedicated React JS developer with ten years of experience
                  building flexible and robust web applications. competent in
                  designing interactive user interfaces using front-end
                  technologies such as React JS, Redux, and others.
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
