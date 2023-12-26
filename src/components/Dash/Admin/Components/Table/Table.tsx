import "./Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FetchQuery } from "../../../../utils/ApiCall";
import { GET_BOOKING } from "../../../../utils/ApiRoutes";
import { useQuery } from "@tanstack/react-query";
import khaltilogo from "../../../../../assets/images/khaltilogo.png";

const fetchBookings = async () => {
  return await FetchQuery(GET_BOOKING);
};

export default function BasicTable() {
  const {data } = useQuery(["bookings"], fetchBookings);

  return (
    <TableContainer component={Paper} className="table"style={{backgroundColor:"#f8f9fa"}}>
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
        {data &&
                  data?.data.bookings.map((booking: any) => (
            <TableRow key={booking.id}>
              <TableCell className="tableCell">{booking.id}</TableCell>
              <TableCell className="tableCell">{booking.venue_id}</TableCell>
              <TableCell className="tableCell">{booking.booked_date}</TableCell>
              <TableCell className="tableCell">{booking.person} people</TableCell>
              <TableCell className="tableCell">Nrs {booking.venue_price}</TableCell>
              <TableCell className="tableCell">Nrs {booking.total_amount}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={khaltilogo} alt="" className="image" />
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
  );
}
