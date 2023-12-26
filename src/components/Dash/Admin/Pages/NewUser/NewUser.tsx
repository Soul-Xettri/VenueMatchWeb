import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  InputBase,
  PasswordInput,
  TextInput,
  Stack,
  Paper,
  Text,
  Grid,
  SimpleGrid,
} from "@mantine/core";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import DashNavbar from "../../Components/Navabar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { PostQuery } from "../../../../utils/ApiCall";
import { SIGNUP } from "../../../../utils/ApiRoutes";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { hasLength, isEmail, matchesField, useForm } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons-react";
import Spinner from "../../../../Spinner/Spinner";

const handlRegisterationPost = async (data: any) => {
  return (await PostQuery(SIGNUP, data))?.data;
};

export default function NewUser() {
  // const [file, setFile] = useState<File | null>(null);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files && e.target.files[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //   }
  // };
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      // mobileNumber: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validate: {
      firstName: hasLength(
        { min: 2, max: 10 },
        "Name must be 2-10 characters long"
      ),
      lastName: hasLength(
        { min: 2, max: 10 },
        "Name must be 2-10 characters long"
      ),
      email: isEmail("Invalid email"),
      // mobileNumber: hasLength({ min: 2, max: 10 }, "Invalid mobile number"),
      password: hasLength(
        { min: 6 },
        "Password must have 6  or more characters"
      ),
      confirmPassword: matchesField("password", "Passwords are not the same"),
    },
  });

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(handlRegisterationPost);
  const handleRegister = (data: any) => {
    const selectedRole = data.role;
    if (
      selectedRole !== "user" &&
      selectedRole !== "venue_owner" &&
      selectedRole !== "admin"
    ) {
      (" Handle invalid role value here (e.g., display an error message)");
      return;
    }
    data.role = selectedRole;
    mutate(data, {
      onSuccess: async (data) => {
        if (data.error === true) {
          showNotification({
            title: "Register Error",
            message: data.message,
            color: "red",
          });
        } else {
          navigate("/users");
          showNotification({
            title: "Register Success",
            message: "New User Added Successfully",
            color: "green",
          });
        }
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
      <Paper withBorder shadow="md" p={10} radius="md" mb={10} style={{backgroundColor:"#f8f9fa"}}>
        <Text>Add new user</Text>
      </Paper>
        <section
          className="form-section overflow-hidden"
          style={{ padding: 0 }}
        >
          <Paper withBorder shadow="md" p={30} radius="md" style={{backgroundColor:"#f8f9fa"}}>
            <Grid>
              {/* <Grid.Col style={{ display: "flex", justifyContent: "center" }}>
                {file ? (
                  <img src={URL.createObjectURL(file)} alt="" width={"100%"} />
                ) : (
                  <img
                    src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    alt=""
                    width={"400px"}
                    height={"400px"}
                  />
                )}
              </Grid.Col> */}
              <Grid.Col>
                <form
                  onSubmit={form.onSubmit((values) => {
                    handleRegister(values);
                  })}
                >
                  <Stack>
                    {/* <div>
                      <label htmlFor="file" style={{cursor:"pointer"}}>
                        Image:{" "}
                        <DriveFolderUploadOutlinedIcon className="icon" />
                        {file ? (
                          <img
                            src={URL.createObjectURL(file)}
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
                    </div> */}
                    <SimpleGrid cols={2}  breakpoints={[
                 
                  { maxWidth: "36rem", cols: 1, spacing: "sm" },
                ]}>
                    <TextInput
                      name="firstName"
                      label="First Name"
                      placeholder="Enter First Name"
                      withAsterisk
                      {...form.getInputProps("firstName")}
                      radius={"100px"}
                      height={"45px"}
                      style={{backgroundColor:"#f8f9fa"}}
                    />
                    <TextInput
                      label="Last Name"
                      placeholder="Enter Last Name"
                      withAsterisk
                      {...form.getInputProps("lastName")}
                      radius={"100px"}
                      height={"45px"}
                    />
                    <TextInput
                      label="Email"
                      placeholder="Enter Email"
                      withAsterisk
                      {...form.getInputProps("email")}
                      radius={"100px"}
                      height={"45px"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                    />
                    {/* <TextInput
              label="Mobile Number"
              placeholder="Enter Mobile Number"
              withAsterisk
              {...form.getInputProps("mobileNumber")}
              radius={"100px"}
              height={"45px"}
            /> */}
                    <PasswordInput
                      label="Password"
                      placeholder="Enter Password"
                      withAsterisk
                      {...form.getInputProps("password")}
                      radius={"100px"}
                      height={"45px"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                    />
                    <PasswordInput
                      label="Confirm Password"
                      placeholder="Enter Password Again"
                      withAsterisk
                      {...form.getInputProps("confirmPassword")}
                      radius={"100px"}
                      height={"45px"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                    />
                    <InputBase
                      label="You are ?"
                      // style={{height:"45px !important"}}
                      withAsterisk
                      component="select"
                      radius={"100px"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      autoComplete="off"
                      {...form.getInputProps("role")}
                      placeholder="I amd"
                      rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    >
                      <option value="user">Select Role</option>
                      <option value="user">Client</option>
                      <option value="venue_owner">Venue Owner</option>
                      <option value="admin">Admin</option>
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
                        Add User {isLoading && <Spinner width="25px" />}
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
