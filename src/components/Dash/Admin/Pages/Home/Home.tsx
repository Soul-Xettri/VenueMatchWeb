import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  SimpleGrid,
} from "@mantine/core";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import DashNavbar from "../../Components/Navabar/Navbar";
import Widget from "../../Components/Widget/Widget";
import Featured from "../../Components/Charts/Featured/Featured";
import BasicTable from "../../Components/Table/Table";
import Normal from "../../Components/Charts/Normal/Normal";


export default function DashHome() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
    style={{backgroundColor:"#f8f9fa"}}
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
        <Header height={{ base: 50, md: 60 }} p="xs" style={{backgroundColor:"#f8f9fa"}}>
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
      <div style={{padding:"10px"}}>
        <SimpleGrid
          cols={4}
          spacing="28px"
          verticalSpacing="20px"
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
          <Widget type="user" />
          <Widget type="venue" />
          <Widget type="bookings" />
          <Widget type="earning" />
          {/* <Widget type="categories" />
          <Widget type="bookings" /> */}
        </SimpleGrid>
        <div style={{ paddingTop: "20px" }}>
          <SimpleGrid
            cols={2}
            spacing="20px"
            verticalSpacing="20px"
            breakpoints={[
              { maxWidth: "36rem", cols: 1, spacing: "sm" },
            ]}
          >
            <Featured />
            <Normal aspect={2 / 1} title="Last 6 Months (Revenue)" />
          </SimpleGrid>
        </div>
        <div style={{ paddingTop: "20px" }}>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <BasicTable/>
        </div>
      </div>
      </div>
    </AppShell>
  );
}
