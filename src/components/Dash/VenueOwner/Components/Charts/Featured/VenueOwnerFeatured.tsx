import "./Featured.scss"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpOutlinedIcon  from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function VenueOwnerFeatured() {
  const[value,setValue]=useState(0)
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
  useEffect(() => {
    if (totalAmountSum !== undefined) {
      const precision = 2; // Number of decimal places you want to display
      const value = (totalAmountSum / 100000) * 100;
      const roundedValue = value.toFixed(precision);
      setValue(parseFloat(roundedValue)); // Convert back to a floating-point number
    }
  }, [totalAmountSum]);

  return (
    <div className="featured1">
      <div className="top1">
        <div className="title1">Total Revenue</div>
        <MoreVertIcon fontSize="small" style={{cursor:"pointer"}}/>
      </div>
      <div className="bottom1">
        <div className="featuredChart1">
        <CircularProgressbar value={value} text={`${value} %`} strokeWidth={6}/>
        </div>
        <p className="title1">Total Revenue made this year</p>
        <p className="amount1">Nrs {totalAmountSum}</p>
        <p className="desc1">Previous transactions processing. Last payments may not be included.</p>
        <div className="summary1">
          <div className="item1">
            <div className="itemTitle1">Target</div>
            <div className="itemResult1 positive1">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount1">Nrs 100k</div>
            </div>
          </div>
          <div className="item1">
            <div className="itemTitle1">This Year</div>
            <div className="itemResult1 negative1">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount1">Nrs 100k</div>
            </div>
          </div>
          <div className="item1">
            <div className="itemTitle1">Last Year</div>
            <div className="itemResult1 positive1">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount1">Nrs 100k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
