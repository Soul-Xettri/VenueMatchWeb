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

export default function SingleUserBookingsTable() {
  const { userId } = useParams();
  const [userApiKey, setUserApiKey] = useState<string | undefined>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalAmountSum, setTotalAmountSum] = useState(0);

  useEffect(() => {
    const fetchUserApiKey = async () => {
      try {
        const response = await axios.get(
          ``
        );
        const userArray = response.data.users;
        if (userArray.length > 0) {
          const user = userArray[0];
          setUserApiKey(user.api_key);
        }
      } catch (error) {
        console.error("Error fetching user API key", error);
      }
    };

    fetchUserApiKey();
  }, [userId]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (userApiKey) {
        try {
          const response = await axios.get(
            "",
            {
              headers: {
                api_key: userApiKey,
              },
            }
          );

          const bookingsArray = response.data.bookings;

          if (bookingsArray && bookingsArray.length > 0) {
            setBookings(bookingsArray);

            const sum = bookingsArray.reduce(
              (total:any, booking:any) => total + booking.total_amount,
              0
            );
            setTotalAmountSum(sum);
          } 
        } catch (error) {
          console.error("Error fetching booking data", error);
        }
      }
    };

    fetchBookingDetails();
  }, [userApiKey]);

  return (
    <div>
      {/* Display the sum of totalAmount */}
      <p>Total Amount Sum: Nrs {totalAmountSum}</p>

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
