import TopHeader from "../HomePage/HomeHeaderSection/TopHeader";
import Header from "../HomePage/HomeHeaderSection/Header";
import Footer from "../HomePage/FooterSection/Footer";
import { FetchQuery } from "../utils/ApiCall";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";
import { useParams } from "react-router-dom";
import banner1 from "../../assets/images/banner-img1.png";
import banner2 from "../../assets/images/banner-img2.png";
import {
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
} from "@mantine/core";
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

const useStyles = createStyles((theme) => ({
  root: {
    // backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundImage:
    //   theme.colorScheme === "dark"
    //     ? "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)"
    //     : "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, #1d293e 100%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)",
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
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
    width:"-webkit-fill-available ",

  },
}));
export default function Detail() {
  const { classes } = useStyles();
  const { id } = useParams();
  const fetchMoreDetail = async () => {
    return await FetchQuery(
      ``
    );
  };
  const { isLoading, data } = useQuery(["venues"], fetchMoreDetail);

  const vegdishes = data?.data?.venues?.[0]?.dishes?.map((dish: any) => (
    <Badge
      variant="outline"
      mr={5}
      style={{ display: dish.dish_type === "Veg" ? "inline-flex" : "none" }}
    >
      {dish.dish_name}
    </Badge>
  ));
  const nonvegdishes = data?.data?.venues?.[0]?.dishes?.map((dish: any) => (
    <Badge
      variant="outline"
      mr={5}
      style={{ display: dish.dish_type === "Non-veg" ? "inline-flex" : "none" }}
    >
      {dish.dish_name}
    </Badge>
  ));

  const dessert = data?.data?.venues?.[0]?.dishes?.map((dish: any) => (
    <Badge
      variant="outline"
      mr={5}
      style={{ display: dish.dish_type === "Dessert" ? "inline-flex" : "none" }}
    >
      {dish.dish_name}
    </Badge>
  ));

  return (
    <>
      <div className="home-header-section">
        <TopHeader />
        <Header />
        <div
          className="home-banner-section overflow-hidden position-relative"
          style={{ paddingTop: "0",paddingBottom:"0" }}
        >
          <figure className="banner-img1 mb-0">
            <img src={banner1} alt="" className="star" />
          </figure>
          <figure className="banner-img2 mb-0">
            <img src={banner2} alt="" className="star" />
          </figure>
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
                          <div className={classes.aboutImage}>
                            <div className={classes.hoverCard}>
                              <Image
                                src={venue.image}
                                className={classes.image}
                                style={{width:"-webkit-fill-available "}}
                              />
                            </div>
                          </div>
                          <div>
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
                                {venue.name}
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

                            <div
                              className="form-section overflow-hidden"
                              style={{ padding: 0, background: "transparent" }}
                            >
                              <div className="banner-btn discover-btn-banner">
                                <button
                                  type="submit"
                                  className="btn btn-primary venue"
                                  style={{
                                    // width: "100%",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    marginTop: "30px",
                                  }}
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
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
      </div>
      <Footer />
    </>
  );
}
