// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const api = axios.create({
//   baseURL: "https://orionapi0.customerdemourl.com/api",
// });
// const refreshAccessToken = async (refreshToken: string,accessToken:string) => {
//   try {
//     const response = await api.post("/tokens/refresh", { refreshToken ,token:accessToken});
//     return response.data.accessToken;
//   } catch (error) {
//     throw new Error("Failed to refresh token");
//   }
// };
//   const isTokenExpired = (token:string) => {
//     if (!token) {
//       return true; // Token is considered expired if it's not present
//     }
//     const decodedToken = jwtDecode(token);
//    return decodedToken.exp ? decodedToken.exp * 1000 < Date.now() : true;
//   };

// api.interceptors.request.use(
//   (config) => {
//     const user = localStorage.getItem("LoggedInUser");
//     if (user) {
//       const userData = JSON.parse(user);
//       config.headers.Authorization = `Bearer ${userData.accessToken}`;
//     }
//     config.headers["tenant"] = "root";

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// api.interceptors.response.use(
//   async (response) => {
//     console.log("-------------------------")
//     const user = localStorage.getItem("LoggedInUser");
//     const userData = JSON.parse(user);
//     const accessToken = await refreshAccessToken(userData.refreshToken,userData.accessToken);
//     console.log("access token",accessToken);
//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401
//        &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       const user = localStorage.getItem("LoggedInUser");
//       if (user) {
//           const userData = JSON.parse(user);
//           const tokenExpire=isTokenExpired(userData.accessToken);
//           console.log("accessToken expiere",userData);
//           if(tokenExpire){// if token is expired, call refreshToken
//             try {
//               const accessToken = await refreshAccessToken(userData.refreshToken,userData.accessToken);
//               console.log("access token",accessToken);
//               localStorage.setItem("LoggedInUser", JSON.stringify(accessToken));
//             } catch (error) {
//               console.error("Failed to refresh access token:", error);
//             }
//           }
//           // const refreshToken=userData.refreshToken;

//           // if (refreshToken) {
//           //   try {
//           //     const accessToken = await refreshAccessToken(refreshToken);
//           //     localStorage.setItem("LoggedInUser", JSON.stringify(accessToken));
//           //   } catch (error) {
//           //     console.error("Failed to refresh access token:", error);
//           //   }
//           // } else {
//           //   console.error("No refresh token found");
//           // }
//       }
//   }
//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const customFetch = axios.create({
  baseURL: "https://orionapi0.customerdemourl.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
const isTokenExpired = async(token: string) => {
  if (!token) {
    return true; // Token is considered expired if it's not present
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.exp ? decodedToken.exp * 1000 < Date.now() : true;
};
const refreshTokenn = async () => {
  try {
    const user = localStorage.getItem("LoggedInUser");
    if (user) {
      const userD = JSON.parse(user);
      const tokenExpire = await isTokenExpired(userD.accessToken);
      if (tokenExpire) {
        const payload = {
          token: userD.accessToken,
          refreshToken: userD.refreshToken,
        };
        const response = await customFetch.post("/tokens/refresh", payload);
        console.log("Refresh Response", response.data);
        return response.data;
      }
    }
  } catch (error) {
    console.log("Error from Api", error);
  }
};
customFetch.interceptors.request.use(
  async (config) => {
    const user = localStorage.getItem("LoggedInUser");
    if (user) {
      const userData = JSON.parse(user);
      config.headers.Authorization = `Bearer ${userData.accessToken}`;
    }
    config.headers["tenant"] = "root";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if ((error.response.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      const resp = await refreshTokenn();
      const accessToken = resp.token;
      const refreshToken = resp.refreshToken;
      console.log("updated accesstoken", accessToken);
      const obj = {
        isUser: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
      localStorage.setItem("LoggedInUser", JSON.stringify(obj));
      customFetch.defaults.headers.common.Authorization = `Bearer${accessToken}`;
      return customFetch(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default customFetch;
