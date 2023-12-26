import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  SimpleGrid,
  Badge,
} from "@mantine/core";

import "./Single.scss"
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleUserBookingsTable from "../../Components/Table/SingleUserBookingTable";
import SingleNormal from "../../Components/Charts/Normal/SingleNormal";
import { VenueOwnerSiderbar } from "../../../VenueOwner/Components/Sidebar/VenueOwnerSidebar";
import VenueOwnerNavbar from "../../../VenueOwner/Components/Navbar/VenueOwnerNavbar";
import PublicBookingNormal from "../../../VenueOwner/Components/Charts/Normal/PublicBookingNormal";
import PublicBookingTable from "../../Components/Table/PublicBookingTable";
import UserVenue from "../../Components/Table/UserVenue";

export default function PublicProfile() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const  {userId} = useParams();
  const [userImage,setUserImage]=useState();
  const [userFirstName,setUserFirstName]=useState();
  const [userLastName,setUserLastName]=useState();
  const [email,setEmail]=useState();
  const [role,setRole]=useState();
  const [userApiKey, setUserApiKey] = useState<string | undefined>();
  const [totalAmountSum, setTotalAmountSum] = useState(0);
  let userName = userFirstName + " " + userLastName
  useEffect(() => {
    axios
      .get(
        ``
      )
      .then((response) => {
          const userArray = response.data.users;
          if (userArray.length > 0){
              const user = userArray[0];
              setUserImage(user.profile_picture)
              setUserFirstName(capitalizeFirstLetter(user.firstName))
              setUserLastName(capitalizeFirstLetter(user.lastName))
              setUserApiKey(user.api_key);
             setEmail(user.email)
             setRole(user.role)
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
              (total:any, booking:any) => total + booking.total_amount,
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

  const capitalizeFirstLetter = (word:any) => {
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
            <VenueOwnerNavbar  />
          </div>
        </Header>
      }
    >
      <div style={{padding:"10px"}}>

      <SimpleGrid
            cols={2}
            spacing="20px"
            verticalSpacing="20px"
            breakpoints={[
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
      <div className="left1">
            <div className="listTitle">Information <span style={{textDecoration:"underline"}}><Badge variant="gradient" gradient={{ from: 'orange', to: 'red' }}>{role}</Badge></span></div>
            <div className="item1">
              <img
                src={userImage ?? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBgsIBw8QEBAPGBYYDw0YDRUgFQogIBsgIiAbKB8kIS8lJCYmJR8fMDYtMTA3PkFAIytBOEE4N0AtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOYAzQMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAgEDB//EADIQAQACAQIEBAMHBAMAAAAAAAABAgMEEgURITETQVFhIlKBFCMyYqGxwUJxkaIzktH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQdZxKunmaU+K3p5VBOeTaK95iPqzmbiGXL3ttj0jojTabTztMz9Qanxq/NX/tD2MlbdrRP1ZQBrhlseovin7u0x9U/TcXmsxXURzj5o7guhxiyVzUi+OYmPV2AAAAAAAAAAAAAAADjLeMeO17doiZkFfxbW+FHg4p+KfxT8qkd5ck5clr37y4AAAAAABI0WrnS5d0dp/FX1aSl4yUi9J5xPaWTXXA8+7HbDb+nrALQAAAAAAAAAAAAABB4xfZorRH9UxCcq+Oz9xjj3/gFKAAAAAAAAmcKvs11PfnCG+2jnlq8U/mj9wagAAAAAAAAAAAAABV8ej7nHPvP7LRXcbrz0kT6TH8gogAAAAAAAH10sc9Tjj80fu+STw6u7W4o9waUAAAAAAAAAAAAABF4nTfockekc/8JTm9d9JrPn0Bkx1euy81ny5xLkAAAAAABP4LTdrN3yxP/iAueBY+WPJknznlALUAAAAAAAAAAAAAAAGe4vi8LWTaO1uqEvuM4PE03iR3p+yhAAAAAAAabQ4vB0lKT35dVFw7B4+rrWe0dZaUAAAAAAAAAAAAAAAAHlo3Vmtu092Y1eCdPqLY58u0+sNQgcV0n2jDvpHxV/2j0BQAAAAAl8O0v2nPyn8Netvf2BZ8H0/hafxLd7/pCweRHKOj0AAAAAAAAAAAAAAAAB5adtZtPk8veKV3XmIj1mVTxHiUXxzh0/Xn3t/AKu9t17W9ZlyAAACy4HflqL0nzjp9Fa+mHLOHLXJTvANUIml19NRERE8rfLKWAAAAAAAAAAAD46jU008c8toj285B9nNrRWOdpiI9ean1HGJt0wV5fmnur8ua2aeeW0z9QXmbimPF0rM2n2hAzcXvfpiiK/rKuAd5Mtstt2S0z/eXAAAAAAAAJODX5MHStpmPSesIwC4w8ZiemevL3hYYdVTP/wAVon282XP7A1wzmn4jkw9Oe6PSVnpuK0y8oyfBP6f5BYDyJ5xzh6AAA5vaKVm155RHefR0oOKazx8nh45+Cv8AsD7azi025003SPn85VdrTad1pmZnvPq8AAAAAAAAAAAAAAAAAAASNNrL6afu56fLPaV3otfXVfD2t8vqzj2szWYmvSY8/QGtELhus+1Ytt/x17/m900EHi2o8DTcq979I9vVn0/jOXxNXNY7VjkgAAAAAAAAAAAAAAAAAAAAAAA+2lzzp89ctfLvHq09bRasWr2nsyTQcHy+Jo4rM9azyBR6i/iZ739Zl8wAAAAAAAAAAAAAAAAAAAAAAATuG6r7PF4nz5IIDrabQA2m0ANptADabQA2m0ANptADabQA2m0ANptADabQA2m0ANptADabQB//2Q=="}
                alt=""
                className="itemImage1"
              />
              <div className="details1">
                <h1 className="itemTitle1">{userName?userName:"No Name"}</h1>
                <div className="detailItem1">
                  <span className="itemKey1">Email:</span>
                  <span className="itemValue1">{email}</span>
                </div>
                <div className="detailItem1">
                  <span className="itemKey1">Phone:</span>
                  <span className="itemValue1">+977 61 232 323 </span>
                </div>
                <div className="detailItem1">
                  <span className="itemKey1">Address:</span>
                  <span className="itemValue1">Elton St.234 LakeSide. Pokhara</span>
                </div>
                <div className="detailItem1">
                  <span className="itemKey1">Country:</span>
                  <span className="itemValue1">NEPAL</span>
                </div>
              </div>
            </div>
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
          <div className="listTitle">My Venues</div>
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
              <div className="listTitle">My Venues</div>
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
