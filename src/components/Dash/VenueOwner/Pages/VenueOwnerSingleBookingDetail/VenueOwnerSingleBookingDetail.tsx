import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Paper,
  Text,
  SimpleGrid,
  Group,
  Badge,
  Stack,
  Image,
} from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import khaltilogo from "../../../../../assets/images/khaltilogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faPhone,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Spinner from "../../../../Spinner/Spinner";
import { VenueOwnerSiderbar } from "../../Components/Sidebar/VenueOwnerSidebar";
import VenueOwnerNavbar from "../../Components/Navbar/VenueOwnerNavbar";

export default function VenueOwnerSingleBookingDetail() {
  const { bookingId } = useParams();
  const [userId, setUserId] = useState();
  const [venueId, setVenueId] = useState();
  const [venueName, setVenueName] = useState();
  const [venueImage, setVenueImage] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categoryName, setCategoryName] = useState();
  const [categoryImage, setCategoryImage] = useState();
  const [bookedFor, setBookedFor] = useState();
  const [venuePrice, setVenuePrice] = useState();
  const [totalPaid, setTotalPaid] = useState();
  const [bookedDate, setBookedDate] = useState();
  const [paymentMedium, setPaymentMedium] = useState();
  const [status, setStatus] = useState();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  useEffect(() => {
    axios
      .get(
        ``
      )
      .then((response) => {
        const bookingsArray = response.data.bookings;
        if (bookingsArray.length > 0) {
          const booking = bookingsArray[0];
          setUserId(booking.user_id);
          setVenueId(booking.venue_id);
          setCategoryId(booking.category_id);
          setBookedFor(booking.person);
          setVenuePrice(booking.venue_price);
          setTotalPaid(booking.total_amount);
          setBookedDate(booking.booked_date);
          setPaymentMedium(booking.payment_medium);
          setStatus(booking.status);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  });

  useEffect(() => {
    axios
      .get(
        ``
      )
      .then((response) => {
        setLoading(false);
        const venueArray = response.data.venues;
        if (venueArray.length > 0) {
          const venue = venueArray[0];
          setVenueName(venue.name);
          setVenueImage(venue.image);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data", error);
      });
  });

  useEffect(() => {
    axios
      .get(
        ``
      )
      .then((response) => {
        setLoading(false);
        setCategoryName(response.data.category.name);
        setCategoryImage(response.data.category.image);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data", error);
      });
  });
  useEffect(() => {
    axios
      .get(
        ``
      )
      .then((response) => {
        const userArray = response.data.users;
        if (userArray.length > 0) {
          const user = userArray[0];
          setUserFirstName(capitalizeFirstLetter(user.firstName));
          setUserLastName(capitalizeFirstLetter(user.lastName));
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  });
  const capitalizeFirstLetter = (word: any) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <AppShell
      style={{ backgroundColor: "#f8f9fa" }}
      layout="alt"
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 250 }}
        >
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
              style={{
                position: "absolute",
                right: "-15px",
                zIndex: 999,
                top: "18px",
              }}
            />
          </MediaQuery>
          <VenueOwnerSiderbar />
        </Navbar>
      }
      header={
        <Header
          height={{ base: 50, md: 60 }}
          p="xs"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <VenueOwnerNavbar />
          </div>
        </Header>
      }
    >
      <Paper
        withBorder
        shadow="md"
        p={10}
        radius="md"
        mb={10}
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Text>Booking Details</Text>
      </Paper>
      {loading && <Spinner width="50px" />}
      <section className="form-section overflow-hidden" style={{ padding: 0 }}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <SimpleGrid
            cols={2}
            spacing={"40px"}
            breakpoints={[{ maxWidth: "71rem", cols: 1, spacing: "sm" }]}
          >
            <Image
              src={venueImage}
              style={{ display: "flex", alignItems: "center" }}
            />
            <div>
              <Stack>
                <div>
                  <p
                    style={{
                      color: "gray",
                      marginBottom: "0",
                      fontSize: "15px",
                    }}
                  >
                    Venue Name
                  </p>
                  <Group position="apart">
                    <h4>{venueName}</h4>
                    <Badge
                      size="md"
                      style={{
                        color: "green",
                        backgroundColor: "rgba(0, 128, 0, 0.151)",
                      }}
                    >
                      {status}
                    </Badge>
                  </Group>
                </div>
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: "22rem", cols: 1, spacing: "sm" }]}
                >
                  <div>
                    <p
                      style={{
                        color: "gray",
                        marginBottom: "0",
                        fontSize: "15px",
                      }}
                    >
                      Venue Category
                    </p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        className="cellImage"
                        src={categoryImage}
                        alt="categoryImage"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <Text fz={"18px"} fw="400">
                        {categoryName}
                      </Text>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "gray",
                        marginBottom: "0",
                        fontSize: "15px",
                      }}
                    >
                      Booked For
                    </p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        style={{
                          marginRight: "10px",
                          color: "#ff7b5f",
                          height: "1rem",
                        }}
                      />
                      <Text fz={"18px"} fw="400">
                        {bookedFor} people
                      </Text>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "gray",
                        marginBottom: "0",
                        fontSize: "15px",
                      }}
                    >
                      Venue Price
                    </p>
                    <Text fz={"18px"} fw="400">
                      Nrs {venuePrice}
                    </Text>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "gray",
                        marginBottom: "0",
                        fontSize: "15px",
                      }}
                    >
                      Total Paid
                    </p>
                    <Text fz={"18px"} fw="400">
                      Nrs {totalPaid}
                    </Text>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "gray",
                        marginBottom: "0",
                        fontSize: "15px",
                      }}
                    >
                      Booked Date
                    </p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        style={{
                          marginRight: "10px",
                          color: "#ff7b5f",
                          height: "1rem",
                        }}
                      />
                      <Text fz={"18px"} fw="400">
                        {bookedDate}
                      </Text>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "gray",
                        marginBottom: "0",
                        fontSize: "15px",
                      }}
                    >
                      Payment Medium
                    </p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        className="cellImage"
                        src={khaltilogo}
                        alt="categoryImage"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <Text fz={"18px"} fw="400">
                        {paymentMedium}
                      </Text>
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "gray",
                        marginBottom: "0",
                        fontSize: "15px",
                      }}
                    >
                      Booked By
                    </p>
                    <Text fz={"18px"} fw="400">
                     <Link to={`/show-user/${userId}`}>{userFirstName} {userLastName}</Link> 
                    </Text>
                  </div>
                  <div>
                    <p
                      style={{
                        color: "gray",
                        marginBottom: "0",
                        fontSize: "15px",
                      }}
                    >
                      Contact No <b>(client)</b>
                    </p>
                    <Text fz={"18px"} fw="400">
                      <FontAwesomeIcon
                        icon={faPhone}
                        style={{
                          marginRight: "10px",
                          color: "#ff7b5f",
                          height: "1rem",
                        }}
                      />
                      +977 61 232 323
                    </Text>
                  </div>
                </SimpleGrid>
              </Stack>
            </div>
          </SimpleGrid>
        </Paper>
      </section>
    </AppShell>
  );
}
