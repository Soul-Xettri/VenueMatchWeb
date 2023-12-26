import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  SimpleGrid,
  Stack,
  InputBase,
} from "@mantine/core";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import DashNavbar from "../../Components/Navabar/Navbar";
import "./Edit.scss";
import { IconChevronDown } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import SingleUserBookingsTable from "../../Components/Table/SingleUserBookingTable";
import SingleNormal from "../../Components/Charts/Normal/SingleNormal";
import axios from "axios";
import { useParams } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../Spinner/Spinner";
import PublicBookingNormal from "../../../VenueOwner/Components/Charts/Normal/PublicBookingNormal";
import PublicBookingTable from "../../Components/Table/PublicBookingTable";
import UserVenue from "../../Components/Table/UserVenue";

export default function Edit() {
  const form = useForm({
    initialValues: {
      newRole: "",
      // ownerStatus: "",
      // status: "",
    },
  });
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { userId } = useParams();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [role, setRole] = useState();
  const [userApiKey, setUserApiKey] = useState<string | undefined>();
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  const navigate = useNavigate();
  let userName = userFirstName + " " + userLastName;
  const [selectedRole, setSelectedRole] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
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
          setUserApiKey(user.api_key);
          setRole(user.role);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (userApiKey) {
        try {
          const response = await axios.get(
            "",
            {
              headers: {
                api_key: userApiKey,
              },
            }
          );

          const bookingsArray = response.data.bookings;

          if (bookingsArray && bookingsArray.length > 0) {
            const sum = bookingsArray.reduce(
              (total: any, booking: any) => total + booking.total_amount,
              0
            );
            setTotalAmountSum(sum);
          }
        } catch (error) {
          console.error("Error fetching booking data", error);
        }
      }
    };

    fetchBookingDetails();
  }, [userApiKey]);

  const capitalizeFirstLetter = (word: any) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleUpdateUser = () => {
    // Check if a role is selected
    if (!selectedRole) {
      alert("Please select a role before updating.");
      return;
    }

    // Start the loading state
    setIsUpdating(true);

    // Send a PUT request to update the user's role
    axios
      .put(``, {
        newRole: selectedRole, // Send the selected role to the server
      })
      .then((response) => {
        // Handle the response as needed
        if (response.status === 200) {
          // Role updated successfully
          showNotification({
            title: `${userName} Role Updated Successfully`,
            message: response.data.message,
            color: "green",
          });
        } else {
          showNotification({
            title: "Update Error",
            message: response.data.message,
            color: "red",
          });
          console.log(response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error updating user role", error);
      })
      .finally(() => {
        // Stop the loading state regardless of success or failure
        setIsUpdating(false);
      });
  };

  const handleDeleteUser = () => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    
    if (confirmDelete) {
       // Start the loading state
       setIsDeleting(true);
      // Make a DELETE request to your server endpoint with the user's ID
      axios
        .delete(
          ``
        )
        .then((response) => {
          // Check the response from the server
          if (response.status === 200) {
            // User deleted successfully
            // You can handle this as needed, e.g., show a success message or redirect
            showNotification({
              title: "User Deleted Successfully",
              message: response.data.message,
              color: "green",
            });
            navigate("/users");
          } else {
            showNotification({
              title: "Delete Error",
              message: response.data.message,
              color: "red",
            });
            console.log(response.data.error);
          }
        })
        .catch((error) => {
          // Handle any network or request errors
          console.error("Error deleting user", error);
        })
        .finally(() => {
          // Stop the loading state regardless of success or failure
          setIsDeleting(false);
        });
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
      <div style={{ padding: "10px" }}>
        <SimpleGrid
          cols={2}
          spacing="20px"
          verticalSpacing="20px"
          breakpoints={[{ maxWidth: "36rem", cols: 1, spacing: "sm" }]}
        >
          <div className="left1">
            <div className="listTitle">
              Edit: <span style={{ color: "black", fontSize: "20px" }}>{userName}</span>
            </div>
            <form onSubmit={form.onSubmit(() => {})}>
              <Stack>
                <InputBase
                  label={`Change User Role -- current (${role})`}
                  // style={{height:"45px !important"}}
                  withAsterisk
                  component="select"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  {...form.getInputProps("role")}
                  rightSection={<IconChevronDown size={14} stroke={1.5} />}
                  onChange={(event) => setSelectedRole(event.target.value)} // Update selected role
                >
                   <option value="">Select a role</option>
                  <option value="user">User</option>
                  <option value="venue_owner">Venue Owner</option>
                  <option value="admin">Admin</option>
                </InputBase>
                {/* <InputBase
                  label="Change User Owner Status -- current (Verified)"
                  // style={{height:"45px !important"}}
                  withAsterisk
                  component="select"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  {...form.getInputProps("role")}
                  placeholder="I amd"
                  rightSection={<IconChevronDown size={14} stroke={1.5} />}
                >
                  <option value="passive">Passive</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                </InputBase>
                <InputBase
                  label="Ban User -- current (False)"
                  // style={{height:"45px !important"}}
                  withAsterisk
                  component="select"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  {...form.getInputProps("role")}
                  placeholder="I amd"
                  rightSection={<IconChevronDown size={14} stroke={1.5} />}
                >
                  <option value="false">False</option>
                  <option value="verified">True</option>
                </InputBase> */}
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleUpdateUser} // Use type="button" to prevent form submission
                      style={{
                        width: "150px",
                        padding: "10px",
                        border: "none",
                        backgroundColor: "teal",
                        color: "white",
                        fontWeight: "bold",
                        display: "flex",
                        cursor: "pointer",
                        justifyContent: "center",
                      }}
                    >
                      Update{" "}{isUpdating && <Spinner width="25px" />}
                    </button>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="button" // Use type="button" to prevent form submission
                      onClick={handleDeleteUser}
                      style={{
                        width: "150px",
                        padding: "10px",
                        border: "none",
                        backgroundColor: "red",
                        color: "white",
                        fontWeight: "bold",
                        display: "flex",
                        cursor: "pointer",
                        justifyContent: "center",
                      }}
                    >
                     Delete User{" "} {isDeleting && <Spinner width="25px" />}
                    </button>
                  </div>
                </div>
              </Stack>
            </form>
          </div>
          {role === "venue_owner" ? (
            <PublicBookingNormal
              aspect={3 / 1}
              title="User Revenue (Last 6 Months)"
              totalSpent={totalAmountSum}
            />
          ) : role === "user" ? (
            <SingleNormal
              aspect={3 / 1}
              title="User Spending (Last 6 Months)"
              totalSpent={totalAmountSum}
            />
          ) : (
            <div>
              <PublicBookingNormal
                aspect={3 / 1}
                title="User Revenue (Last 6 Months)"
                totalSpent={totalAmountSum}
              />
              <SingleNormal
                aspect={3 / 1}
                title="User Spending (Last 6 Months)"
                totalSpent={totalAmountSum}
              />
            </div>
          )}
        </SimpleGrid>
        {role === "venue_owner" ? (
          <div>
            <div style={{ paddingTop: "20px" }}>
              <div className="listContainer">
              <div className="listTitle">User's Venues</div>
                <UserVenue />
              </div>
            </div>
          <div style={{ paddingTop: "20px" }}>
            <div className="listContainer">
            <div className="listTitle">Latest Bookings For User's Venues</div>
              <PublicBookingTable />
            </div>
          </div>
          </div>
          
        ) : role === "user" ? (
          <div style={{ paddingTop: "20px" }}>
            <div className="listContainer">
              <div className="listTitle">Latest Transactions</div>
              <SingleUserBookingsTable />
            </div>
          </div>
        ) : (
          <div>
            <div style={{ paddingTop: "20px" }}>
              <div className="listContainer">
              <div className="listTitle">User's Venues</div>
                <UserVenue />
              </div>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <div className="listContainer">
              <div className="listTitle">Latest Bookings For User's Venues</div>
                <PublicBookingTable />
              </div>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <div className="listContainer">
                <div className="listTitle">Latest Transactions</div>
                <SingleUserBookingsTable />
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
