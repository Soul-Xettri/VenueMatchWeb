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
  Grid,
  SimpleGrid,
  PasswordInput,
} from "@mantine/core";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import DashNavbar from "../../Components/Navabar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { PostQueryWithAPI, PutQueryWithAPI } from "../../../../utils/ApiCall";
import { CHANGE_PASSWORD, UPDATE_PROFILE } from "../../../../utils/ApiRoutes";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { hasLength, useForm } from "@mantine/form";
import Spinner from "../../../../Spinner/Spinner";
import Cookies from "js-cookie";
import axios from "axios";

const customHeaders = {
  api_key: `${Cookies.get("apikey")}`,
};
const updateProfile = async (data: any) => {
  return (await PostQueryWithAPI(UPDATE_PROFILE, data, customHeaders))?.data;
};

const changePassword = async (data: any) => {
  return (await PutQueryWithAPI(CHANGE_PASSWORD, data, customHeaders))?.data;
};

export default function ProfileEdit() {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  };
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  
  const form1 = useForm({
    initialValues: {
      current_password: "",
      new_password: "",
    },
    validate: {
      new_password: hasLength(
        { min: 6 },
        "Password must have 6  or more characters"
      ),
    },
  });

  const navigate = useNavigate();
  //   const { mutate, isLoading } = useMutation(updateProfile , changePassword);
  const profileUpdateMutation = useMutation(updateProfile);
  const passwordChangeMutation = useMutation(changePassword);
  const [userImage, setUserImage] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    axios
      .get(``, {
        headers: {
          api_key: `${Cookies.get("apikey")}`,
        },
      })
      .then((response) => {
        setUserImage(response.data.profilePic);
        form.setValues({
          firstname:response.data.firstname,
          lastname:response.data.lastname
        });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  },[]);
  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
    },
    validate: {
      firstname: hasLength(
        { min: 2, max: 10 },
        "Name must be 2-10 characters long"
      ),
      lastname: hasLength(
        { min: 2, max: 10 },
        "Name must be 2-10 characters long"
      ),
    },
  });
  const handleProfileUpdate = (data: any) => {
    const requestData = { ...data, image: image };
    profileUpdateMutation.mutate(requestData, {
      onSuccess: async (data) => {
        if (data.error === true) {
          showNotification({
            title: "Update Error",
            message: data.message,
            color: "red",
          });
          console.log(data.error);
        } else {
          showNotification({
            title: "Update Success",
            message: data.message,
            color: "green",
          });
          navigate("/admin-profile");
        }
      },
      onError: (e: any) => {
        showNotification({
          title: "Update Error",
          message: e.response.data.message,
          color: "red",
        });
        console.log(e.response.data);
      },
    });
  };
  const handlePasswordChange = (data: any) => {
    passwordChangeMutation.mutate(data, {
      onSuccess: async (data) => {
        if (data.error === true) {
          showNotification({
            title: "Update Error",
            message: data.message,
            color: "red",
          });
          console.log(data.error);
        } else {
          showNotification({
            title: "Update Success",
            message: data.message,
            color: "green",
          });
          navigate("/admin-profile");
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
  const deleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this account?");
    if (confirmDelete){
      setIsDeleting(true);
    try {
      // Send a DELETE request to the /delete-my-account endpoint
      const response = await axios.delete(
        "",
        {
          headers: {
            api_key: Cookies.get("apikey"),
          },
        }
      );
  
      // Check the response and handle it accordingly
      if (response.status === 200 && response.data.error === false) {
        showNotification({
          title: "User Deleted Successfully",
          message: response.data.message,
          color: "green",
        });
        navigate("/auth");
        Cookies.remove('apikey');
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
      console.error("Error deleting user account", error);
    } finally {() => {
      // Stop the loading state regardless of success or failure
      setIsDeleting(false);
    }};
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
        <Text>Edit Your Profile</Text>
      </Paper>
      <section className="form-section overflow-hidden" style={{ padding: 0 }}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Grid>
            <Grid.Col style={{ display: "flex", justifyContent: "center" }}>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="" width={"100%"} />
              ) : (
                <img
                  src={userImage ??
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAHBgsIBw8QEBAPGBYYDw0YDRUgFQogIBsgIiAbKB8kIS8lJCYmJR8fMDYtMTA3PkFAIytBOEE4N0AtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOYAzQMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAgEDB//EADIQAQACAQIEBAMHBAMAAAAAAAABAgMEEgURITETQVFhIlKBFCMyYqGxwUJxkaIzktH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQdZxKunmaU+K3p5VBOeTaK95iPqzmbiGXL3ttj0jojTabTztMz9Qanxq/NX/tD2MlbdrRP1ZQBrhlseovin7u0x9U/TcXmsxXURzj5o7guhxiyVzUi+OYmPV2AAAAAAAAAAAAAAADjLeMeO17doiZkFfxbW+FHg4p+KfxT8qkd5ck5clr37y4AAAAAABI0WrnS5d0dp/FX1aSl4yUi9J5xPaWTXXA8+7HbDb+nrALQAAAAAAAAAAAAABB4xfZorRH9UxCcq+Oz9xjj3/gFKAAAAAAAAmcKvs11PfnCG+2jnlq8U/mj9wagAAAAAAAAAAAAABV8ej7nHPvP7LRXcbrz0kT6TH8gogAAAAAAAH10sc9Tjj80fu+STw6u7W4o9waUAAAAAAAAAAAAABF4nTfockekc/8JTm9d9JrPn0Bkx1euy81ny5xLkAAAAAABP4LTdrN3yxP/iAueBY+WPJknznlALUAAAAAAAAAAAAAAAGe4vi8LWTaO1uqEvuM4PE03iR3p+yhAAAAAAAabQ4vB0lKT35dVFw7B4+rrWe0dZaUAAAAAAAAAAAAAAAAHlo3Vmtu092Y1eCdPqLY58u0+sNQgcV0n2jDvpHxV/2j0BQAAAAAl8O0v2nPyn8Netvf2BZ8H0/hafxLd7/pCweRHKOj0AAAAAAAAAAAAAAAAB5adtZtPk8veKV3XmIj1mVTxHiUXxzh0/Xn3t/AKu9t17W9ZlyAAACy4HflqL0nzjp9Fa+mHLOHLXJTvANUIml19NRERE8rfLKWAAAAAAAAAAAD46jU008c8toj285B9nNrRWOdpiI9ean1HGJt0wV5fmnur8ua2aeeW0z9QXmbimPF0rM2n2hAzcXvfpiiK/rKuAd5Mtstt2S0z/eXAAAAAAAAJODX5MHStpmPSesIwC4w8ZiemevL3hYYdVTP/wAVon282XP7A1wzmn4jkw9Oe6PSVnpuK0y8oyfBP6f5BYDyJ5xzh6AAA5vaKVm155RHefR0oOKazx8nh45+Cv8AsD7azi025003SPn85VdrTad1pmZnvPq8AAAAAAAAAAAAAAAAAAASNNrL6afu56fLPaV3otfXVfD2t8vqzj2szWYmvSY8/QGtELhus+1Ytt/x17/m900EHi2o8DTcq979I9vVn0/jOXxNXNY7VjkgAAAAAAAAAAAAAAAAAAAAAAA+2lzzp89ctfLvHq09bRasWr2nsyTQcHy+Jo4rM9azyBR6i/iZ739Zl8wAAAAAAAAAAAAAAAAAAAAAAATuG6r7PF4nz5IIDrabQA2m0ANptADabQA2m0ANptADabQA2m0ANptADabQA2m0ANptADabQB//2Q=="
                  }
                  alt=""
                  width={"400px"}
                  height={"400px"}
                />
              )}
            </Grid.Col>
            <Grid.Col>
              <form
                onSubmit={form.onSubmit((values) => {
                  handleProfileUpdate(values);
                })}
              >
                <Stack>
                  <div>
                    <label htmlFor="file" style={{ cursor: "pointer" }}>
                      Image: <DriveFolderUploadOutlinedIcon className="icon" />
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt=""
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            marginLeft: "30px",
                          }}
                          className="registerImage"
                        />
                      ) : (
                        <img
                          src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          alt=""
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            marginLeft: "30px",
                          }}
                          className="registerImage"
                        />
                      )}
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                  <SimpleGrid
                    cols={2}
                    breakpoints={[
                      { maxWidth: "36rem", cols: 1, spacing: "sm" },
                    ]}
                  >
                    <TextInput
                      label="First Name"
                      placeholder="Enter First Name"
                      withAsterisk
                      {...form.getInputProps("firstname")}
                      radius={"100px"}
                      height={"45px"}
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                    <TextInput
                      label="Last Name"
                      placeholder="Enter Last Name"
                      withAsterisk
                      {...form.getInputProps("lastname")}
                      radius={"100px"}
                      height={"45px"}
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
                      Update Profile{" "}
                      {profileUpdateMutation.isLoading && (
                        <Spinner width="25px" />
                      )}
                    </button>
                  </div>
                </Stack>
              </form>
            </Grid.Col>
          </Grid>
        </Paper>
      </section>
      <Paper
        withBorder
        shadow="md"
        p={10}
        radius="md"
        mt={10}
        mb={10}
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Text color="red">Change Your Password</Text>
      </Paper>
      <section className="form-section overflow-hidden" style={{ padding: 0 }}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Grid>
            <Grid.Col>
              <form
                onSubmit={form1.onSubmit((values) => {
                  handlePasswordChange(values);
                })}
              >
                <Stack>
                  <SimpleGrid
                    cols={2}
                    breakpoints={[
                      { maxWidth: "36rem", cols: 1, spacing: "sm" },
                    ]}
                  >
                    <PasswordInput
                      label="Password"
                      placeholder="Enter Current Password"
                      withAsterisk
                      {...form1.getInputProps("current_password")}
                      radius={"100px"}
                      height={"45px"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                    />
                    <PasswordInput
                      label="Password"
                      placeholder="Enter New Password"
                      withAsterisk
                      {...form1.getInputProps("new_password")}
                      radius={"100px"}
                      height={"45px"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
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
                      Change Password{" "}
                      {passwordChangeMutation.isLoading && (
                        <Spinner width="25px" />
                      )}
                    </button>
                  </div>
                </Stack>
              </form>
            </Grid.Col>
          </Grid>
        </Paper>
      </section>
      <Paper
        withBorder
        shadow="md"
        p={10}
        radius="md"
        mt={10}
        style={{ backgroundColor: "#f8f9fa" }}
      >
      
      <section className="form-section overflow-hidden" style={{ padding:"5px "}}>
        <div
          className="banner-btn discover-btn-banner"
          style={{ display: "flex",justifyContent:"space-between",alignItems:"center" }}
        >
        <Text color="red">Delete Account</Text>
          <button
            type="button"
            onClick={deleteAccount}
            className="btn btn-primary"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor:"red"
            }}
          >
            Delete Account{" "}
            {isDeleting && <Spinner width="25px" />}
          </button>
        </div>
      </section>
      </Paper>
    </AppShell>
  );
}
