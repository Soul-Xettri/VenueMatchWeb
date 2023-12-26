import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  TextInput,
  Stack,
  Paper,
  Text,
  InputBase,
  SimpleGrid,
} from "@mantine/core";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import DashNavbar from "../../Components/Navabar/Navbar";
import { PostQuery } from "../../../../utils/ApiCall";
import { ADD_DISH, UPLOAD_DISH } from "../../../../utils/ApiRoutes";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons-react";
import Spinner from "../../../../Spinner/Spinner";
import { useParams } from "react-router-dom";

const handleDishPost = async (data: any) => {
  return (await PostQuery(UPLOAD_DISH, data))?.data;
};
const handeleDishAddToVenue = async (data: any) => {
  return (await PostQuery(ADD_DISH, data))?.data;
};
export default function Dish() {
  const theme = useMantineTheme();
  const { venueId } = useParams();
  const [dishId, setDishId] = useState();
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      type: "",
      venue_id: `${venueId}`,
      dish_id: `${dishId}`,
    },
  });
  const { mutate: mutateDishPost, isLoading: isLoadingDishPost } =
    useMutation(handleDishPost);
  const { mutate: mutateDishAddToVenue, isLoading: isLoadingDishAddToVenue } =
    useMutation(handeleDishAddToVenue);
  useEffect(() => {
    if (dishId) {
      form.setFieldValue("dish_id", dishId); // Update the form field value
    }
  }, [dishId]);
  const handleUploadDish = (data: any) => {
    mutateDishPost(data, {
      onSuccess: async (data) => {
        if (data.error === true) {
          showNotification({
            title: "Upload Error",
            message: data.message,
            color: "red",
          });
          console.log(data.error);
        } else {
          showNotification({
            title: "Upload Success",
            message: data.message,
            color: "green",
          });
          setDishId(data.rowId);
        }
      },
      onError: (e: any) => {
        showNotification({
          title: "Upload Error",
          message: e.response.data.message,
          color: "red",
        });
        console.log(e.response.data);
      },
    });
  };
  const handleAddDish = (data: any) => {
    mutateDishAddToVenue(data, {
      onSuccess: async (data) => {
        if (data.error === true) {
          showNotification({
            title: "Upload Error",
            message: data.message,
            color: "red",
          });
          console.log(data.error);
        } else {
          showNotification({
            title: "Upload Success",
            message: data.message,
            color: "green",
          });
          setDishId(data.rowId);
        }
      },
      onError: (e: any) => {
        showNotification({
          title: "Upload Error",
          message: e.response.data.message,
          color: "red",
        });
        console.log(e.response.data);
      },
    });
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
        <Text>Step 1 :- Add new dish</Text>
      </Paper>
      <section className="form-section overflow-hidden" style={{ padding: 0 }}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <form
            onSubmit={form.onSubmit((values) => {
              handleUploadDish(values);
            })}
          >
            <Stack>
              <SimpleGrid
                cols={2}
                breakpoints={[
                  { maxWidth: "48rem", cols: 2, spacing: "50px" },
                  { maxWidth: "36rem", cols: 1, spacing: "sm" },
                ]}
              >
                <TextInput
                  name="name"
                  label="Dish Name"
                  placeholder="Enter Dish Name"
                  withAsterisk
                  {...form.getInputProps("name")}
                  radius={"100px"}
                  height={"45px"}
                  style={{ backgroundColor: "#f8f9fa" }}
                />
                <InputBase
                  label="Dish Type"
                  // style={{height:"45px !important"}}
                  withAsterisk
                  component="select"
                  radius={"100px"}
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  {...form.getInputProps("type")}
                  placeholder="I amd"
                  rightSection={<IconChevronDown size={14} stroke={1.5} />}
                >
                  <option value="" disabled hidden>
                    Choose Dish Type
                  </option>
                  <option value="Veg">Veg</option>
                  <option value="Non-veg">Non-veg</option>
                  <option value="Dessert">Dessert</option>
                </InputBase>
              </SimpleGrid>
              <div className="banner-btn discover-btn-banner"  style={{display:"flex",justifyContent:"center"}}>
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
                  Upload Dish {isLoadingDishPost && <Spinner width="25px" />}
                </button>
              </div>
            </Stack>
          </form>
        </Paper>
      </section>
      <Paper
        withBorder
        shadow="md"
        p={10}
        radius="md"
        mt={20}
        mb={10}
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Text>Step 2 :- Add the new dish to the venue "both venue_id and dish_id will auto fill itself when new dish is added"</Text>{" "}
      </Paper>
      <section className="form-section overflow-hidden" style={{ padding: 0 }}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <form
            onSubmit={form.onSubmit((values) => {
              handleAddDish(values);
            })}
          >
            <Stack>
              <SimpleGrid
                cols={2}
                breakpoints={[
                  { maxWidth: "48rem", cols: 2, spacing: "50px" },
                  { maxWidth: "36rem", cols: 1, spacing: "sm" },
                ]}
              >
                <TextInput
                  name="id"
                  label="Venue_Id"
                  placeholder="Enter Venue Id"
                  withAsterisk
                  {...form.getInputProps("venue_id")}
                  radius={"100px"}
                  height={"45px"}
                  style={{ backgroundColor: "#f8f9fa" }}
                  disabled
                />
                <TextInput
                  name="id"
                  label="Dish_Id"
                  placeholder="Enter Dish Id"
                  withAsterisk
                  {...form.getInputProps("dish_id")}
                  radius={"100px"}
                  height={"45px"}
                  style={{ backgroundColor: "#f8f9fa" }}
                  disabled
                />
              </SimpleGrid>
              <div className="banner-btn discover-btn-banner" style={{display:"flex",justifyContent:"center"}}>
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
                  Add Dish To Venue{" "}
                  {isLoadingDishAddToVenue && <Spinner width="25px" />}
                </button>
              </div>
            </Stack>
          </form>
        </Paper>
      </section>
    </AppShell>
  );
}
