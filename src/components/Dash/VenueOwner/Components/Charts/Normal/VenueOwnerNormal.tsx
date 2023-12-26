import { useEffect, useState } from "react";
import "./Normal.scss";
import {
  AreaChart,
  Area,
  XAxis,
  // YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Cookies from "js-cookie";


export default function VenueOwnerNormal({ aspect, title }: any) {
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  const [myVenueIds, setMyVenueIds] = useState([0]);
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
  };
  fetchBookingDetailsForVenues(myVenueIds);
  const data = [
    { name: "April", total: 0 },
    { name: "May", total: 0 },
    { name: "June", total: 0 },
    { name: "July", total: 0 },
    { name: "August", total: 0 },
    { name: "September", total: totalAmountSum },
  ];
  return (
    <div className="normal">
      <div className="title">{title}</div>{" "}
      <ResponsiveContainer width="100%" aspect={aspect} className="normalChart">
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          style={{ cursor: "pointer" }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
