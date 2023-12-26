import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import khaltilogo from "../../../../../assets/images/khaltilogo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Booking {
  id: number;
  booked_date: string;
  person: string;
  venue_price: number;
  total_amount: number;
  payment_medium: string;
  status: string;
  venue_id:number;
}

export default function PublicBookingTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  const [myVenueIds, setMyVenueIds] = useState([0]);
  const  {userId} = useParams();
  useEffect(() => {
    axios
      .get(``)
      .then((response) => {
        if (response.status === 200 && response.data && Array.isArray(response.data.venues)) {
          // Extract venue IDs
          const venueIds = response.data.venues.map((venueItem: any) => venueItem.id);
          setMyVenueIds(venueIds);
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
        setBookings(bookingDetails);
        const sum = bookingDetails.reduce(
            (total:any, booking:any) => total + booking.total_amount,
            0
          );
          setTotalAmountSum(sum);
      } else {
        // Handle error response here
        console.error("Error fetching booking details for venues");
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("Error:", error);
    }
  };fetchBookingDetailsForVenues(myVenueIds);
//   useEffect(() => {
//     // Get the API key from cookies
//     const userApiKey = Cookies.get("apikey");

//     if (!userApiKey) {
//       console.error("API key not found in cookies.");
//       return;
//     }

//     const fetchBookingDetails = async () => {
//       try {
//         const response = await axios.get(
//           "",
//           {
//             headers: {
//               api_key: userApiKey,
//             },
//           }
//         );

//         const bookingsArray = response.data.bookings;

//         if (bookingsArray && bookingsArray.length > 0) {
//           setBookings(bookingsArray);

//           const sum = bookingsArray.reduce(
//             (total:any, booking:any) => total + booking.total_amount,
//             0
//           );
//           setTotalAmountSum(sum);
//         }
//       } catch (error) {
//         console.error("Error fetching booking data", error);
//       }
//     };

//     fetchBookingDetails();
//   }, []);

  return (
    <div>
      {/* Display the sum of totalAmount */}
      <p>Total Amount Made: Nrs {totalAmountSum}</p>

      <TableContainer
        component={Paper}
        className="table"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">ID</TableCell>
              <TableCell className="tableCell">Venue Id</TableCell>
              <TableCell className="tableCell">Booked Date</TableCell>
              <TableCell className="tableCell">Booked For</TableCell>
              <TableCell className="tableCell">Venue Price</TableCell>
              <TableCell className="tableCell">Total Paid</TableCell>
              <TableCell className="tableCell">Payment Medium</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="tableCell">{booking.id}</TableCell>
                <TableCell className="tableCell">{booking.venue_id}</TableCell>
                <TableCell className="tableCell">{booking.booked_date}</TableCell>
                <TableCell className="tableCell">
                  {booking.person ? `${booking.person} people` : ""}
                </TableCell>
                <TableCell className="tableCell">
                  {booking.venue_price ? `Nrs ${booking.venue_price}` : ""}
                </TableCell>
                <TableCell className="tableCell">
                  {booking.total_amount ? `Nrs ${booking.total_amount}` : ""}
                </TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {booking.payment_medium && (
                      <img src={khaltilogo} alt="" className="image" />
                    )}
                    {booking.payment_medium}
                  </div>
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${booking.status}`}>{booking.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}