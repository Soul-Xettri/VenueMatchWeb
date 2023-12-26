import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserVenue() {
  const { userId } = useParams();
  const [venues, setVenues] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ``
        );

        if (response.status === 200 && response.data && Array.isArray(response.data.venues)) {
          // Flatten the nested structure and set it to the state
          const flattenedVenues = response.data.venues.flatMap((venueItem:any) =>
            venueItem.venues.map((innerVenue:any) => ({
              id: innerVenue.id,
              name: innerVenue.name,
              location: innerVenue.location,
              price: innerVenue.price,
              image: innerVenue.image,
            }))
            );
          setVenues(flattenedVenues);
        } else {
          console.error("Invalid response format: No 'venues' found in the response.");
        }
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Total Venues: {venues.length} </p>
    <TableContainer
      component={Paper}
      className="table"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Venue Id</TableCell>
            <TableCell className="tableCell">Venue Name</TableCell>
            <TableCell className="tableCell">Location</TableCell>
            <TableCell className="tableCell">Venue Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {venues.map((venue:any) => (
            <TableRow key={venue.id}>
              <TableCell className="tableCell">{venue.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={`${venue.image}`} alt="" className="image" />
                  {venue.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                {venue.location}
              </TableCell>
              <TableCell className="tableCell">Nrs {venue.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
