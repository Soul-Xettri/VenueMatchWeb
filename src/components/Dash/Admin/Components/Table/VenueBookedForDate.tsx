import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "@mantine/core";

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

export default function VenueBookedForDate() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [myVenueIds, setMyVenueIds] = useState([0]);
  const { venueId } = useParams();
  useEffect(() => {
    setMyVenueIds([Number(venueId)]);
  }, [venueId]);
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
      } else {
        // Handle error response here
        console.error("Error fetching booking details for venues");
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("Error:", error);
    }
  };useEffect(() => {
    fetchBookingDetailsForVenues(myVenueIds);
  }, [myVenueIds]);
  return (
    <div>
      <TableContainer
        component={Paper}
        className="table"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{backgroundColor:"lightblue"}}>
              <TableCell className="tableCell"><Badge variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Venue Booking Status</Badge></TableCell>
              <TableCell className="tableCell"><Badge variant="gradient" gradient={{ from: 'green', to: 'red' }}>Booked Date</Badge></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="tableCell" style={{width:"80%"}}>The Venue is boooked for</TableCell>
                <TableCell  className="tableCell">{booking.booked_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}