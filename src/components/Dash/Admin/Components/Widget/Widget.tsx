import "./Widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { IconBrandBooking, IconBuildingCottage } from "@tabler/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

interface WidgetData {
  title: string;
  isMoney: boolean;
  link: string;
  icon: JSX.Element;
  amount:string;
  linkto:string;
}

interface WidgetProps {
  type: string;
}

export default function Widget({ type }: WidgetProps) {

  let data: WidgetData | undefined;
  const [userCount, setUserCount] = useState(0);
  const [venueCount, setVenueCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [myVenueIds, setMyVenueIds] = useState([0]);
  const[myVenueBookingsCount,setMyVenueBookingsCount]=useState(0);
  const[myVenueCount,setMyVenueCount]=useState(0);
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  const [totalDishes, setTotalDishes] = useState(0);
  // temp data
  const diff = 20;
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
          setMyVenueCount(flattenedVenues.length);
          // Update state with venue data and IDs
          setMyVenueIds(venueIds);
          // Call fetchBookingDetailsForVenues only if venueIds are available
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
        setMyVenueBookingsCount(bookingDetails.length);
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
  // fetchBookingDetailsForVenues(myVenueIds);
  useEffect(() => {
    if (myVenueIds.length > 0) {
      fetchMyDishes(myVenueIds);
    }
  }, [myVenueIds]);
  const fetchMyDishes = async (venueIds: number[]) => {
    try {
      const response = await axios.post(
        "",
        { venueIds }
      );
  
      if (response.status === 200) {
        // Handle successful response here
        const myDishesData = response.data.all_dishes_by_venue;
        
        // Transform the data to include unique IDs
        const transformedData = Object.keys(myDishesData).map((venueId) => {
          return myDishesData[venueId].map((dish:any, index:any) => ({
            id: `${venueId}-${index}`, // Generate a unique ID using venueId and index
            ...dish,
          }));
        }).flat();
  
        const itemCount = transformedData.length;
        setTotalDishes(itemCount)
      } else {
        // Handle error response here
        console.error("Error fetching booking details for venues");
      }
    } catch (error) {
      // Handle network or other errors here
      console.error("Error:", error);
    }
  };
  // fetchMyDishes(myVenueIds);
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setUserCount(response.data.total_users);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setVenueCount(response.data.total_venues);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setCategoryCount(response.data.total_categories);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setBookingCount(response.data.total_bookings);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("")
      .then((response) => {
        setTotalAmount(response.data.total_amount);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlineIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
        amount:`${userCount}`,
        linkto:"/users"
      };
      break;
    case "venue":
      data = {
        title: "VENUES",
        isMoney: false,
        link: "View all venues",
        icon: (
          <IconBuildingCottage
            className="icon"
            style={{ color: "goldenrod", backgroundColor: "rgba(218,165,32,0.2)" }}
          />
        ),
        amount:`${venueCount}`,
        linkto:"/venue"

      };
      break;
      case "myvenue":
        data = {
          title: "MY VENUES",
          isMoney: false,
          link: "View all venues",
          icon: (
            <IconBuildingCottage
              className="icon"
              style={{ color: "goldenrod", backgroundColor: "rgba(218,165,32,0.2)" }}
            />
          ),
          amount:`${myVenueCount}`,
          linkto:"/my-venues"
        };
        break;
    case "earning":
      data = {
        title: "TOTAL EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
        amount:`${totalAmount}`,
        linkto:"/bookings"

      };
      break;
      case "myearning":
      data = {
        title: "TOTAL EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
          />
        ),
        amount:`${totalAmountSum}`,
        linkto:"/my-venue-bookings"

      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
          />
        ),
        amount:`${totalAmount}`,
        linkto:"#"

      };
      break;
      case "categories":
        data = {
          title: "CATEGORIES",
          isMoney: false,
          link: "View all categories",
  
          icon: (
            <AccountBalanceWalletOutlinedIcon
              className="icon"
              style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
            />
          ),
          amount:`${categoryCount}`,
          linkto:"/categories"

        };
        break;
        case "mycategories":
          data = {
            title: "MY CATEGORIES",
            isMoney: false,
            link: "View all categories",
    
            icon: (
              <AccountBalanceWalletOutlinedIcon
                className="icon"
                style={{ color: "purple", backgroundColor: "rgba(128,0,128,0.2)" }}
              />
            ),
            amount:`${categoryCount}`,
            linkto:"#"

          };
          break;
          case "myvenuebookings":
        data = {
          title: "MY VENUE BOOKINGS",
          isMoney: false,
          link: "See details",
  
          icon: (
            <IconBrandBooking
              className="icon"
              style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
            />
          ),
          amount:`${myVenueBookingsCount}`,
          linkto:"/my-venue-bookings"

        };
        break;
      case "bookings":
        data = {
          title: "BOOKINGS",
          isMoney: false,
          link: "See details",
  
          icon: (
            <IconBrandBooking
              className="icon"
              style={{ color: "green", backgroundColor: "rgba(0,128,0,0.2)" }}
            />
          ),
          amount:`${bookingCount}`,
          linkto:"/bookings"

        };
        break;
        case "dishes":
        data = {
          title: "MY DISHES",
          isMoney: false,
          link: "See details",
  
          icon: (
            <FontAwesomeIcon icon={faBowlFood}className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
            />

          ),
          amount:`${totalDishes}`,
          linkto:"/my-dishes"

        };
        break;
    default:
      break;
  }

  if (!data) {
    // Handle the case when `data` is undefined (no matching type)
    return null;
  }

  return (
    
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "Nrs "}
          {data.amount}
        </span>
        <Link to={data.linkto}>
        <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
}
