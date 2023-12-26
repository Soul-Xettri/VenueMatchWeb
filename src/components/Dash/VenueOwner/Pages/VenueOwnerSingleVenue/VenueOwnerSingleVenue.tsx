import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  createStyles,
  Container,
  Title,
  Text,
  rem,
  em,
  Image,
  SimpleGrid,
  Group,
  Badge,
  Paper,
} from "@mantine/core";
import "./VenueOwnerSingleVenue.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlRice,
  faCalendarDays,
  faEgg,
  faIceCream,
  faLocationDot,
  faUserGroup,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FetchQuery } from "../../../../utils/ApiCall";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../../Spinner/Spinner";
import { VenueOwnerSiderbar } from "../../Components/Sidebar/VenueOwnerSidebar";
import VenueOwnerNavbar from "../../Components/Navbar/VenueOwnerNavbar";
import Cookies from "js-cookie";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import VenueBookedForDate from "../../../Admin/Components/Table/VenueBookedForDate";
const useStyles = createStyles((theme) => ({
  root: {
    // backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundImage:
    //   theme.colorScheme === "dark"
    //     ? "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)"
    //     : "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, #1d293e 100%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
    // paddingTop: `calc(${theme.spacing.xl} * 3)`,
    // paddingBottom: `calc(${theme.spacing.xl} * 1)`,
  },

  inner: {
    display: "flex",
    justifyContent: "center",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  image: {
    width: "100%",
    objectFit: "cover",
    transition: "transform 500ms ease",
    "&:hover": {
      transform: "scale(1.1,1.1)",
    },
  },

  content: {
    // paddingTop: `calc(${theme.spacing.xl} * 2)`,
    // paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    // marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : "#002247",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.colorScheme === "dark" ? theme.white : "#495057",

    opacity: 0.75,
    maxWidth: "100%",

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
  search: {
    backgroundPosition: "center",
  },
  // imageTop: {
  //   position: "relative",
  //   width: "100%",
  //   paddingRight: "15px",
  //   paddingLeft: "15px",
  //   [`@media  (max-width: ${em(992)})`]: {
  //     height: rem(401.6),
  //     width: rem(300),
  //   },
  // },
  aboutImage: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    [`@media (max-width: ${em(575)}) and (min-width: ${em(320)})`]: {
      minHeight: "initial",
    },
    [`@media  (min-width: ${em(768)}) and (max-width: ${em(948)}) `]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  aboutImageTop: {
    position: "absolute",
    width: "50%",
    left: 0,
    bottom: "10%",
    [`@media (max-width: ${em(575)}) and (min-width: ${em(320)})`]: {
      position: "relative",
      width: "100%",
      bottom: "0",
      marginBottom: "15px",
      transform: "translateY(0)",
      border: 0,
    },
    zIndex: 1,
    [`@media  (min-width: ${em(768)}) and (max-width: ${em(948)}) `]: {
      width: "75%",
      bottom: "0%",
      left: "auto",
    },
  },
  aboutImageBottom: {
    position: "relative",
    width: "80%",
    right: "-20%",
    [`@media (max-width: ${em(575)}) and (min-width: ${em(320)})`]: {
      position: "relative",
      width: "100%",
      right: "0%",
    },
    [`@media  (min-width: ${em(768)}) and (max-width: ${em(948)}) `]: {
      width: "75%",
      right: "0%",
    },
  },
  hoverCard: {
    background: "transparent",
    overflow: "hidden",
    position: "relative",
    display: "inline-block",
    width: "-webkit-fill-available ",
  },
}));

export default function VenueOwnerSingleVenue() {
  const { classes } = useStyles();
  const { venueId } = useParams();
  const fetchMoreDetail = async () => {
    return await FetchQuery(
      ``
    );
  };
  const { isLoading, data } = useQuery(["venues"], fetchMoreDetail);

  const vegdishes = data?.data?.venues?.[0]?.dishes?.map(
    (dish: any, index: number) => (
      <Badge
        key={index}
        variant="outline"
        mr={5}
        style={{ display: dish.dish_type === "Veg" ? "inline-flex" : "none" }}
      >
        {dish.dish_name}
      </Badge>
    )
  );

  const nonvegdishes = data?.data?.venues?.[0]?.dishes?.map(
    (dish: any, index: number) => (
      <Badge
        key={index}
        variant="outline"
        mr={5}
        style={{
          display: dish.dish_type === "Non-veg" ? "inline-flex" : "none",
        }}
      >
        {dish.dish_name}
      </Badge>
    )
  );

  const dessert = data?.data?.venues?.[0]?.dishes?.map(
    (dish: any, index: number) => (
      <Badge
        key={index}
        variant="outline"
        mr={5}
        style={{
          display: dish.dish_type === "Dessert" ? "inline-flex" : "none",
        }}
      >
        {dish.dish_name}
      </Badge>
    )
  );
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  let userName = userFirstName + " " + userLastName;
  const capitalizeFirstLetter = (word: any) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  useEffect(() => {
    axios
      .get(
        ``
      )
      .then((response) => {
        const user_id = response.data.user_id;
        const userId = user_id !== undefined ? user_id : 0;
        setUserId(userId);
      })
      .catch((error) => {
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
  const deleteVenue = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (confirmDelete) {
      setIsDeleting(true);
      try {
        // Send a DELETE request to the /delete-my-account endpoint
        const response = await axios.delete(
          ``,
          {
            headers: {
              api_key: Cookies.get("apikey"),
            },
          }
        );

        // Check the response and handle it accordingly
        if (response.status === 200 && response.data.error === false) {
          showNotification({
            title: "Venue Deleted Successfully",
            message: response.data.message,
            color: "green",
          });
          navigate("/my-venues");
        } else {
          showNotification({
            title: "Update Error",
            message: response.data.message,
            color: "red",
          });
          console.log(response.data.error);
        }
      } catch (error) {
        // Handle network or request errors
        showNotification({
          title: "Access Denied",
          message: "You don't own this venue",
          color: "red",
        });
        setIsDeleting(false);
        console.error("Error deleting venue", error);
      } finally {
        () => {
          // Stop the loading state regardless of success or failure
          setIsDeleting(false);
        };
      }
    }
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
                top: "20px",
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
      <div
        className="home-banner-section overflow-hidden position-relative"
        style={{ paddingTop: "0", paddingBottom: "0" }}
      >
        {isLoading && <Spinner width="50px" />}
        {/* <Container size={700} my={40} pt={0}> */}
        {data &&
          data?.data.venues.map((venue: any) => (
            <div key={venue.id}>
              {/* <MoreDetail
                      description={venue.description}
                      price={venue.price}
                      image={
                        venue.image
                          ? venue.image
                          : `../src/assets/images/venue-match-logo .png`
                      }
                      name={venue.name}
                      location={venue.location}
                      capacity={venue.capacity}
                      status={venue.booking_status?venue.booking_status:"Available"}
                    /> */}
              <div
                className={classes.root}
                // style={{
                //   backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)`,
                // }}
              >
                <Container size="lg">
                  <div className={classes.inner}>
                    <div className={classes.content}>
                      <SimpleGrid
                        cols={1}
                        spacing="20px"
                        verticalSpacing="30px"
                        //   breakpoints={[
                        //     {
                        //       maxWidth: "70rem",
                        //       cols: 2,
                        //       spacing: "60px",
                        //       verticalSpacing: "60px",
                        //     },
                        //     { maxWidth: "48rem", cols: 1, spacing: "50px" },
                        //     { maxWidth: "36rem", cols: 1, spacing: "sm" },
                        //   ]}
                      >
                        <Paper
                            withBorder
                            shadow="md"
                            p={10}
                            radius="md"
                            mt={10}
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                        <div className={classes.aboutImage}>
                          <div className={classes.hoverCard}>
                            <Image
                              src={venue.image}
                              className={classes.image}
                              style={{ width: "-webkit-fill-available " }}
                            />
                          </div>
                        </div>
                        </Paper>
                        <div>
                        <Paper
                            withBorder
                            shadow="md"
                            p={10}
                            radius="md"
                            mt={10}
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                          <Group position="apart">
                            <Title
                              order={1}
                              sx={(theme) => ({
                                color:
                                  theme.colorScheme === "dark"
                                    ? theme.white
                                    : "#002247",

                                fontWeight: 600,
                                [theme.fn.smallerThan("md")]: {
                                  maxWidth: "100%",
                                  fontSize: rem(34),
                                  lineHeight: 1.15,
                                },
                              })}
                            >
                              {venue.name}{" "}
                              <span
                                style={{
                                  fontWeight: 400,
                                  fontSize: "1.1rem",
                                  letterSpacing: "initial",
                                  wordSpacing: "initial",
                                }}
                              >
                                ( {userName ? userName : "No Owner"} )
                              </span>
                            </Title>
                            <Text fz="lg" fw={500} color="#ff7b5f" size="lg">
                              Rs {venue.price}
                            </Text>
                          </Group>
                          <Text
                            className={classes.description}
                            mt={20}
                            style={{ fontSize: "1.1rem", color: "#002247" }}
                          >
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              style={{
                                height: "1.1rem",
                                marginRight: "5px",
                                color: "#ff7b5f",
                              }}
                            />
                            {venue.location}
                          </Text>

                          <Group spacing={30} mt={"30px"}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faUserGroup}
                                style={{
                                  marginRight: "5px",
                                  color: "#ff7b5f",
                                  height: "1.25rem",
                                }}
                              />
                              <Text
                                className={classes.description}
                                style={{ marginTop: "5px" }}
                                c="dimmed"
                              >
                                {venue.capacity} People
                              </Text>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faUtensils}
                                style={{
                                  marginRight: "5px",
                                  color: "#ff7b5f",
                                  height: "1.25rem",
                                }}
                              />
                              <Text
                                className={classes.description}
                                style={{ marginTop: "5px" }}
                                c="dimmed"
                              >
                                Catering
                              </Text>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCalendarDays}
                                style={{
                                  marginRight: "5px",
                                  color: "#ff7b5f",
                                  height: "1.25rem",
                                }}
                              />
                              <Text
                                className={classes.description}
                                style={{ marginTop: "5px" }}
                                c="dimmed"
                              >
                                {venue.booking_status
                                  ? venue.booking_status
                                  : "Available"}
                              </Text>
                            </div>
                          </Group>

                          <Text className={classes.description} mt={30}>
                            {venue.description}
                          </Text>

                          <Text
                            className={classes.description}
                            mt={30}
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "500",
                              color: "#002247",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faBowlRice}
                              style={{
                                marginRight: "5px",
                                color: "#ff7b5f",
                              }}
                            />
                            Veg Dishes
                          </Text>
                          <Text className={classes.description} mt={0}>
                            {vegdishes}
                          </Text>

                          <Text
                            className={classes.description}
                            mt={20}
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "500",
                              color: "#002247 ",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faEgg}
                              style={{
                                marginRight: "5px",
                                color: "#ff7b5f",
                              }}
                            />
                            Non-Veg Dishes
                          </Text>
                          <Text className={classes.description} mt={0}>
                            {nonvegdishes}
                          </Text>
                          <Text
                            className={classes.description}
                            mt={20}
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: "500",
                              color: "#002247",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faIceCream}
                              style={{
                                marginRight: "5px",
                                color: "#ff7b5f",
                              }}
                            />
                            Desserts
                          </Text>
                          <Text className={classes.description} mt={0}>
                            {dessert}
                          </Text>
                          </Paper>
                          <Paper
                            withBorder
                            shadow="md"
                            p={10}
                            radius="md"
                            mt={30}
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <VenueBookedForDate />
                          </Paper>
                          <SimpleGrid
                            cols={3}
                            spacing="28px"
                            verticalSpacing="0px"
                            mt={"25px"}
                            mb={"20px"}
                            breakpoints={[
                              {
                                maxWidth: "70rem",
                                cols: 2,
                                spacing: "40px",
                                verticalSpacing: "30px",
                              },
                              { maxWidth: "48rem", cols: 2, spacing: "40px" },
                              { maxWidth: "36rem", cols: 1, spacing: "sm" },
                            ]}
                          >
                            {/* update venue button */}
                            <Link to={"update-my-venue"}>
                              <div
                                className="form-section overflow-hidden"
                                style={{
                                  padding: 0,
                                  background: "transparent",
                                }}
                              >
                                <div
                                  className="banner-btn discover-btn-banner"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-primary venue venueUpdate"
                                    style={{
                                      // width: "100%",
                                      paddingTop: "10px",
                                      paddingBottom: "10px",
                                      backgroundColor: "Orange",
                                    }}
                                  >
                                    Update Venue
                                  </button>
                                </div>
                              </div>
                            </Link>
                            {/* add dish */}
                            <Link to={"dish"}>
                              <div
                                className="form-section overflow-hidden"
                                style={{
                                  padding: 0,
                                  background: "transparent",
                                }}
                              >
                                <div
                                  className="banner-btn discover-btn-banner"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    type="submit"
                                    className="btn btn-primary venue"
                                    style={{
                                      // width: "100%",
                                      paddingTop: "10px",
                                      paddingBottom: "10px",
                                    }}
                                  >
                                    Add Venue Dish
                                  </button>
                                </div>
                              </div>
                            </Link>
                            {/* delete venue button */}
                            <div
                              className="form-section overflow-hidden"
                              style={{
                                padding: 0,
                                background: "transparent",
                              }}
                            >
                              <div
                                className="banner-btn discover-btn-banner"
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={deleteVenue}
                                  className="btn btn-primary venue venueUpdate"
                                  style={{
                                    // width: "100%",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    backgroundColor: "red",
                                  }}
                                >
                                  Delete Venue{" "}
                                  {isDeleting && <Spinner width="25px" />}
                                </button>
                              </div>
                            </div>
                          </SimpleGrid>
                        </div>
                      </SimpleGrid>
                    </div>
                  </div>
                </Container>
              </div>
            </div>
          ))}
        {/* </Container> */}
      </div>
    </AppShell>
  );
}
