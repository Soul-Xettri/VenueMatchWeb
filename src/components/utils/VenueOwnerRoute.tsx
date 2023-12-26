import { Outlet , Navigate, } from "react-router-dom";
import Cookies from "js-cookie";

  const VenueOwnerRoute = ({}) => {
  // let auth = { token: false }
     const authToken = Cookies.get("apikey")
     const userRole = Cookies.get("role");
     const isValidUser = authToken && userRole === "venue_owner";
  return(
    isValidUser?<Outlet />:<Navigate to='/venue-owner'/>
  )
};
export default VenueOwnerRoute;
