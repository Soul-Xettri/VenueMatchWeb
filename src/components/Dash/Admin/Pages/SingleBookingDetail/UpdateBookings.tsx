import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  InputBase,
  TextInput,
  Stack,
  Paper,
  Text,
  Grid,
  SimpleGrid,
  Badge,
} from "@mantine/core";
import { PostQueryWithAPI } from "../../../../utils/ApiCall";
import { VENUE_BOOKING } from "../../../../utils/ApiRoutes";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import {useParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons-react";
import Spinner from "../../../../Spinner/Spinner";
import Cookies from "js-cookie";
import axios from "axios";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import DashNavbar from "../../Components/Navabar/Navbar";
import VenueBookedForDate from "../../Components/Table/VenueBookedForDate";

const customHeaders = {
  api_key: `${Cookies.get("apikey")}`,
};
const handleBookingPost = async (data: any) => {
  return (await PostQueryWithAPI(VENUE_BOOKING, data, customHeaders))?.data;
};

export default function UpdateBookings() {
  const { venueId } = useParams();
  const [venueName, setVenueName] = useState();
  useEffect(() => {
    axios
      .get(
        ``
      )
      .then((response) => {
        const venueName = response.data.venues[0]?.name || "";
        const venueCategoryId = response.data.venues[0]?.category_id || "";
        const venuePrice = response.data.venues[0]?.price || "";
        setVenueName(venueName);
        form.setValues({
          categoryId: venueCategoryId,
          bookingPrice: venuePrice,
        });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [venueId]); // Include venueId in the dependency array if it's being used in this effect
  useEffect(() => {
    const price = parseFloat(form.values.bookingPrice);
    const people = parseFloat(form.values.bookingPeople);
    // Check if price and people are valid numbers
    if (!isNaN(price) && !isNaN(people)) {
      // Calculate the totalAmount
      const calculatedTotalAmount = (price * people).toString();
      // Update the totalAmount state
      form.setValues({
        totalAmount: calculatedTotalAmount,
      });
    } else {
      // If price or people are not valid numbers, reset totalAmount
      form.setValues({
        totalAmount: "",
      });
    }
  });
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      venueId: venueId,
      categoryId: "",
      bookingDate: "",
      bookingPeople: "",
      bookingPrice: "",
      totalAmount: "",
      paymentMedium: "kalti",
    },
  });

  const { mutate, isLoading } = useMutation(handleBookingPost);
  const handleBooking = (data: any) => {
    mutate(data, {
      onSuccess: async (data) => {
        if (data.error === true) {
          showNotification({
            title: "Update Error",
            message: data.message,
            color: "red",
          });
        } else {
          showNotification({
            title: "Update Success",
            message: "Booking updated successfully",
            color: "green",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      },
      onError: async (error: any) => {
        showNotification({
          title: "Update Error",
          message: error.response.data.message,
          color: "red",
        });
        console.log(error.response.data);
      },
    });
  };
  const form1 = useForm({
    initialValues: {
      venue_id: venueId,
      booked_date: "",
    },
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteBooking = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
  
    if (confirmDelete) {
      setIsDeleting(true);
  
      try {
        // Get the values from form1
        const { venue_id, booked_date } = form1.values;
  
        // Send a DELETE request to the /delete-booking-by-date-and-venue endpoint
        const response = await axios.delete(
          "",
          {
            headers: {
              api_key: Cookies.get("apikey"),
            },
            data: { venue_id, booked_date }, // Include venue_id and booked_date from form1
          }
        );
  
        // Check the response and handle it accordingly
        if (response.status === 200 && response.data.error === false) {
          showNotification({
            title: "Booking Removed Successfully",
            message: response.data.message,
            color: "green",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          showNotification({
            title: "Delete Error",
            message: response.data.message,
            color: "red",
          });
          console.log(response.data.error);
        }
      } catch (error) {
        // Handle network or request errors
        console.error("Error deleting booking", error);
      } finally {
        setIsDeleting(false); // Stop the loading state regardless of success or failure
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
          <Sidebar />
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
            <DashNavbar />
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
        <Text>
          Update Venue Booking for{" "}
          <Badge variant="gradient" gradient={{ from: "red", to: "blue" }}>
            {venueName}
          </Badge>
        </Text>
      </Paper>
      <Paper
        withBorder
        shadow="md"
        p={10}
        radius="md"
        mt={20}
        mb={30}
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <VenueBookedForDate />
      </Paper>
      <section className="form-section overflow-hidden" style={{ padding: 0 }}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          mt={0}
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Grid>
            <Grid.Col>
              <form
                onSubmit={form.onSubmit((values) => {
                  handleBooking(values);
                })}
              >
                <Stack>
                  <SimpleGrid
                    cols={2}
                    breakpoints={[
                      { maxWidth: "36rem", cols: 1, spacing: "sm" },
                    ]}
                  >
                    <TextInput
                      name="venueId"
                      label="Venue Id"
                      placeholder="Venue Id"
                      withAsterisk
                      {...form.getInputProps("venueId")}
                      radius={"100px"}
                      height={"45px"}
                      style={{ backgroundColor: "#f8f9fa" }}
                      value={venueId}
                      disabled
                    />
                    <InputBase
                      label="Category"
                      // style={{height:"45px !important"}}
                      withAsterisk
                      component="select"
                      radius={"100px"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                      {...form.getInputProps("categoryId")}
                      placeholder="I amd"
                      rightSection={<IconChevronDown size={14} stroke={1.5} />}
                      disabled
                    >
                      <option value="" disabled hidden>
                        Choose Venue Category
                      </option>
                      <option value="13">Wedding</option>
                      <option value="14">Birthday</option>
                      <option value="15">Engagement</option>
                      <option value="16">Formal</option>
                      <option value="17">Concert</option>
                      <option value="18">Festive</option>
                      <option value="19">Meeting</option>
                    </InputBase>
                    <TextInput
                      name="bookingDate"
                      label="Booked Date"
                      placeholder="Enter Booked date"
                      withAsterisk
                      {...form.getInputProps("bookingDate")}
                      radius={"100px"}
                      height={"45px"}
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                    <TextInput
                      name="bookingPeople"
                      label="Booked For"
                      placeholder="Enter the Number Of People Booked For"
                      withAsterisk
                      {...form.getInputProps("bookingPeople")}
                      radius={"100px"}
                      height={"45px"}
                    />
                    <TextInput
                      label="Booking Price"
                      placeholder="Booking Price"
                      withAsterisk
                      {...form.getInputProps("bookingPrice")}
                      radius={"100px"}
                      height={"45px"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                      disabled
                    />
                    {/* <TextInput
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              withAsterisk
              {...form.getInputProps("mobileNumber")}
              radius={"100px"}
              height={"45px"}
            /> */}
                    <TextInput
                      label="Total Amount"
                      placeholder="Total Amount"
                      withAsterisk
                      {...form.getInputProps("totalAmount")}
                      radius={"100px"}
                      height={"45px"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                      disabled
                    />
                    <TextInput
                      label="Payment Medium"
                      placeholder="Payment Medium"
                      withAsterisk
                      {...form.getInputProps("paymentMedium")}
                      radius={"100px"}
                      height={"45px"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                      value={"kalti"}
                      disabled
                    />
                  </SimpleGrid>
                  <div
                    className="banner-btn discover-btn-banner"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      Update Booking {isLoading && <Spinner width="25px" />}
                    </button>
                  </div>
                </Stack>
              </form>
            </Grid.Col>
          </Grid>
        </Paper>
      </section>
      <section className="form-section overflow-hidden" style={{ padding: 0 }}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          mt={30}
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Grid>
            <Grid.Col>
            <form
                onSubmit={form1.onSubmit(() => {
                  deleteBooking();
                })}
              >
                <Stack>
                  <SimpleGrid
                    cols={2}
                    breakpoints={[
                      { maxWidth: "36rem", cols: 1, spacing: "sm" },
                    ]}
                  >
                    <TextInput
                      name="venueId"
                      label="Venue Id"
                      placeholder="Venue Id"
                      withAsterisk
                      {...form1.getInputProps("venueId")}
                      radius={"100px"}
                      height={"45px"}
                      style={{ backgroundColor: "#f8f9fa" }}
                      value={venueId}
                      disabled
                    />
                    <TextInput
                      name="booked_date"
                      label="Booked Date"
                      placeholder="Enter booked date to remove"
                      withAsterisk
                      {...form1.getInputProps("booked_date")}
                      radius={"100px"}
                      height={"45px"}
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </SimpleGrid>
                  <div
                    className="banner-btn discover-btn-banner"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        backgroundColor: "red",
                      }}
                    >
                      Remove Booking {isDeleting && <Spinner width="25px" />}
                    </button>
                  </div>
                </Stack>
              </form>
            </Grid.Col>
          </Grid>
        </Paper>
      </section>
    </AppShell>
  );
}
