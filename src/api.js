// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true
// });

// export default api;

import axios from "axios";
import ProtectedRoute from "./ProtectedRoute";

const api = axios.create({
  //baseURL: import.meta.env.VITE_API_BASE_URL,
 
  withCredentials: true
});

export default api;
