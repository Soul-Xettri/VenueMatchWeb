import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import DashNavbar from "../../Components/Navabar/Navbar";
import DataTable from "../../Components/Datatable/DataTable";
import { useParams } from "react-router-dom";
import axios from "axios";
import { venueColumns } from "../../Components/Datatable/DataTableSource";

export default function SingleCategory() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [singleCategoryData, setSingleCategoryData] = useState({});
  const { categoryId } = useParams();
  const [title, setTitle] = useState("");
  const [categoryImage,setCategoryImage]=useState();
  useEffect(() => {
    axios
      .get(
        ``
      )
      .then((response) => {
        setSingleCategoryData(response.data.venues);
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
            setTitle(response.data.category.name)
           setCategoryImage(response.data.category.image)
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  });
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
      <div style={{ display: "flex", width: "100%" }}>
        <div>
          <DataTable
          showCategoryImage={true}
          categoryImage={categoryImage}
            title={`Category ${title}`}
            tableColumns={venueColumns}
            tableRows={singleCategoryData}
            showAddNewButton={true}
          />
        </div>
      </div>
    </AppShell>
  );
}
