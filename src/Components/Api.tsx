import axios from "axios";

const api = axios.create({
  baseURL: "https://orionapi0.customerdemourl.com/api",
});
api.interceptors.request.use(
  (config) => {
        config.headers['Tenant']='root';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    // response.headers['Tenant']='root';
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;