import { Outlet , Navigate, } from "react-router-dom";
import Cookies from "js-cookie";

  const AdminRoute = ({}) => {
  // let auth = { token: false }
     const authToken = Cookies.get("apikey")
     const userRole = Cookies.get("role");
     const isValidUser = authToken && userRole === "admin";
  return(
    isValidUser?<Outlet />:<Navigate to='/auth'/>
  )
};
export default AdminRoute;
