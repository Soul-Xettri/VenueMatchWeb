import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./components/Auth/Authentication";
import Home from "./components/HomePage/Home";
import { Error404 } from "./components/ErrorPages/Error404";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Venue from "./components/Venue/Venue";
import Gallery from "./components/Gallery/Gallery";
import { SuccessSignUp } from "./components/SuccessPage/SuccessSignUp";
import { Notifications } from "@mantine/notifications";
import About from "./components/About/About";
import Detail from "./components/Venue/Detail";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { ForgotPassword } from "./components/Auth/ForgotPassword";

import { useEffect, useState } from "react";
import axios from "axios";

import AdminRoute from "./components/utils/AdminRoute";
import DashHome from "./components/Dash/Admin/Pages/Home/Home";
import List from "./components/Dash/Admin/Pages/List/List";
import {
  bookingColumns,
  categoryColumns,
  dishColumns,
  userColumns,
  venueColumns,
} from "./components/Dash/Admin/Components/Datatable/DataTableSource";
import Single from "./components/Dash/Admin/Pages/Single/Single";
import Edit from "./components/Dash/Admin/Pages/Edit/Edit";
import NewUser from "./components/Dash/Admin/Pages/NewUser/NewUser";
import SingleVenue from "./components/Dash/Admin/Pages/SingleVenue/SingleVenue";
import Dish from "./components/Dash/Admin/Pages/Dish/Dish";
import NewVenue from "./components/Dash/Admin/Pages/NewVenue/NewVenue";
import SingleCategory from "./components/Dash/Admin/Pages/SingleCategory/SingleCategory";
import NewCategory from "./components/Dash/Admin/Pages/NewCategory/NewCategory";
import VenueOwnerRoute from "./components/utils/VenueOwnerRoute";
import VenueOwnerHome from "./components/Dash/VenueOwner/Pages/Home/VenueOwnerHome";
import SingleBookingDetail from "./components/Dash/Admin/Pages/SingleBookingDetail/SingleBookingDetail";
import Stats from "./components/Dash/Admin/Pages/Stats/Stats";
import Profile from "./components/Dash/Admin/Pages/Profile/Profile";
import ProfileEdit from "./components/Dash/Admin/Pages/Profile/EditProfile";
import VenueOwnerProfile from "./components/Dash/VenueOwner/Pages/VenueOwnerProfile/VenueOwnerProfile";
import VenueOwnerProfileEdit from "./components/Dash/VenueOwner/Pages/VenueOwnerProfile/VenueOwnerProfileEdit";
import VenueOwnerList from "./components/Dash/VenueOwner/Pages/VenueOwnerList/VenueOwnerList";
import Cookies from "js-cookie";
import VenueOwnerSingleVenue from "./components/Dash/VenueOwner/Pages/VenueOwnerSingleVenue/VenueOwnerSingleVenue";
import VenueOwnerDish from "./components/Dash/VenueOwner/Pages/VenueOwnerDish/VenueOwnerDish";
import VenueOwnerNewVenue from "./components/Dash/VenueOwner/Pages/VenueOwnerNewVenue/VenueOwnerNewVenue";
import VenueOwnerSingleBookingDetail from "./components/Dash/VenueOwner/Pages/VenueOwnerSingleBookingDetail/VenueOwnerSingleBookingDetail";
import VenueOwnerDishesLists from "./components/Dash/VenueOwner/Pages/VenueOwnerDishesLists/VenueOwnerDishesLists";
import VenueOwnerUpadateVenue from "./components/Dash/VenueOwner/Pages/VenueOwnerUpdateVenue/VenueOwnerUpadateVenue";
import UpadateVenue from "./components/Dash/Admin/Pages/UpdateVenue/UpadateVenue";
import MyStats from "./components/Dash/VenueOwner/Pages/MyStats/MyStats";
import PublicProfile from "./components/Dash/Admin/Pages/Single/PublicProfile";
import UpadateBookings from "./components/Dash/Admin/Pages/SingleBookingDetail/UpdateBookings";
import VenueOwnerUpdateBooking from "./components/Dash/VenueOwner/Pages/VenueOwnerSingleBookingDetail/VenueOwnerUpdateBookings";

const queryClient = new QueryClient();
interface Dish {
  id: string; // Make sure 'id' matches the expected type in your data grid component
  dish_id: number;
  dish_type: string;
  dish_name: string;
}
function App() {
  const [allUsersData, setAllUsersData] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [bookingData, setBookingData] = useState({});
  const [myVenuebookingData, setMyVenueBookingData] = useState([]);
  const [myDishData, setMyDishData] = useState<Dish[]>([]);
  const [myVenueData, setMyVenueData] = useState({});
  const [myVenueIds, setMyVenueIds] = useState([0]);
  
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        // Extract the users data from the response
        //  const { users } = response.data;

        // Extract the user_id values and store them in an array
        //  const userIds = users.map((user:any) => user.user_id);

        // Set the user_id values in the state
        setAllUsersData(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setVenueData(response.data.venues);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("", {
        headers: {
          api_key: Cookies.get("apikey"),
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data && Array.isArray(response.data.venues)) {
          // Extract venue IDs
          const venueIds = response.data.venues.map((venueItem: any) => venueItem.id);
          // Extract venues and venue IDs
          const myVenues = response.data.venues.map((venueItem: any) => venueItem.venues);
          const flattenedVenues = myVenues.flat();
          setMyVenueData(flattenedVenues);
          // Update state with venue data and IDs
          setMyVenueIds(venueIds);
          if (venueIds.length > 0) {
            fetchBookingDetailsForVenues(venueIds);
          }
        } else {
          console.error("Invalid response format: No 'venues' found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching venue data:", error);
      });
  }, []);
  
  const fetchBookingDetailsForVenues = async (venueIds: number[]) => {
    try {
      const response = await axios.post(
        "",
        { venueIds }
      );

      if (response.status === 200) {
        // Handle successful response here
        const bookingDetails = response.data.bookings;
        setMyVenueBookingData(bookingDetails);
      } else {
        // Handle error response here
        console.error("Error fetching booking details for venues");
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("Error:", error);
    }
  };
  // fetchBookingDetailsForVenues(myVenueIds);
  const fetchMyDishes = async (venueIds: number[]) => {
    try {
      const response = await axios.post(
        "",
        { venueIds }
      );
  
      if (response.status === 200) {
        // Handle successful response here
        const myDishesData = response.data.all_dishes_by_venue;
         // Initialize an incrementing counter
      let counter = 1;
        // Transform the data to include unique IDs
        const transformedData = Object.keys(myDishesData).map((venueId) => {
          return myDishesData[venueId].map((dish:any, index:any) => ({
            index: counter++,
            id: `${venueId}-${index}`, // Generate a unique ID using venueId and index
            ...dish,
          }));
        }).flat();
  
        setMyDishData(transformedData);
      } else {
        // Handle error response here
        console.error("Error fetching booking details for venues");
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (myVenueIds.length > 0) {
      fetchMyDishes(myVenueIds);
    }
  }, [myVenueIds]);
  // fetchMyDishes(myVenueIds);
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setCategoryData(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setBookingData(response.data.bookings);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* <MantineProvider> */}
        <Notifications position="top-right" />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="success" element={<SuccessSignUp />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="auth">
              <Route index element={<Authentication />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
            <Route path="venues">
              <Route index element={<Venue />} />
              <Route path=":id" element={<Detail />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="admin" element={<DashHome />} />
              <Route path="admin-profile">
                <Route index element={<Profile />} />
                <Route path="edit" element={<ProfileEdit />} />
              </Route>
              <Route path="users">
                <Route
                  index
                  element={
                    <List
                      title="User Table"
                      tableColumns={userColumns}
                      tableRows={allUsersData}
                      showAddNewButton={true}
                    />
                  }
                />
                <Route path=":userId">
                  <Route index element={<Single />} />
                  <Route path="edit" element={<Edit />} />
                </Route>
                <Route path="new" element={<NewUser />} />
              </Route>
              <Route path="venue">
                <Route
                  index
                  element={
                    <List
                      title="Venue Table"
                      tableColumns={venueColumns}
                      tableRows={venueData}
                      showAddNewButton={true}
                    />
                  }
                />
                <Route path=":venueId">
                  <Route index element={<SingleVenue />} />
                  <Route path="dish" element={<Dish />} />
                  <Route path="update-venue">
                    <Route index  element={<UpadateVenue/>}/>
                  <Route path="update-bookings" element={<UpadateBookings/>}/>
                  </Route>
                </Route>
                <Route path="new" element={<NewVenue />} />
              </Route>
              <Route path="categories">
                <Route
                  index
                  element={
                    <List
                      title="Category Table"
                      tableColumns={categoryColumns}
                      tableRows={categoryData}
                      showAddNewButton={true}
                    />
                  }
                />
                <Route path=":categoryId">
                  <Route index element={<SingleCategory />} />
                  <Route path=":venueId">
                    <Route index element={<SingleVenue />} />
                    <Route path="dish" element={<Dish />} />
                  <Route path="update-venue" element={<UpadateVenue/>}/>
                  </Route>
                  <Route path="new" element={<NewVenue />} />
                </Route>
                <Route path="new" element={<NewCategory />} />
              </Route>
              <Route path="bookings">
                <Route
                  index
                  element={
                    <List
                      title="Current Bookings"
                      tableColumns={bookingColumns}
                      tableRows={bookingData}
                    />
                  }
                />
                <Route path=":bookingId" element={<SingleBookingDetail />} />
              </Route>
              <Route path="stats" element={<Stats />} />
              {/* <Route path="profile" element={<Single />} /> */}
            </Route>
            <Route element={<VenueOwnerRoute />}>
              <Route path="venue-owner" element={<VenueOwnerHome />} />
              <Route path="show-user/:userId" element={<PublicProfile/>}/>
              <Route path="venue-owner-profile">
                <Route index element={<VenueOwnerProfile />} />
                <Route path="edit" element={<VenueOwnerProfileEdit />} />
              </Route>
              <Route path="my-venues">
                <Route
                  index
                  element={
                    <VenueOwnerList
                      title="My Venue Table"
                      tableColumns={venueColumns}
                      tableRows={myVenueData}
                     showAddNewButton={true }
                    />
                  }
                />
                <Route path=":venueId">
                  <Route index element={<VenueOwnerSingleVenue />} />
                  <Route path="dish" element={<VenueOwnerDish />} />
                  <Route path="update-my-venue" >
                    <Route index element={<VenueOwnerUpadateVenue/>}/>
                  <Route path="update-my-booking" element={<VenueOwnerUpdateBooking/>}/>
                  </Route>
                </Route>
                <Route path="new" element={<VenueOwnerNewVenue />} />
              </Route>
              <Route path="my-venue-bookings">
                <Route
                  index
                  element={
                    <VenueOwnerList
                      title="Current Bookings"
                      tableColumns={bookingColumns}
                      tableRows={myVenuebookingData}
                    />
                  }
                />
                <Route path=":bookingId" element={<VenueOwnerSingleBookingDetail />} />
              </Route>
              <Route path="my-dishes">
                <Route index element={<VenueOwnerDishesLists title="My Dishes"
                      tableColumns={dishColumns}
                      tableRows={myDishData}/>}/>
              </Route>
              <Route path="my-stats" element={<MyStats />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
        <ScrollToTop />
        {/* </MantineProvider> */}
      </Router>
    </QueryClientProvider>
  );
}

export default App;
