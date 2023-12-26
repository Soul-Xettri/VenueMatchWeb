import { useState } from "react";
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
} from "@mantine/core";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import DashNavbar from "../../Components/Navabar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { PostQuery } from "../../../../utils/ApiCall";
import { UPLOAD_CATEGORY} from "../../../../utils/ApiRoutes";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import Spinner from "../../../../Spinner/Spinner";

const handleCategoryPost = async (data: any) => {
  return (await PostQuery(UPLOAD_CATEGORY, data))?.data;
};

export default function NewCategory() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      form.setFieldValue("image", selectedFile);
    }
  };
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      category_name: "",
    },
  });
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(handleCategoryPost);
  const handleCategory = (data: any) => {
    const requestData = { ...data, file: image };
    mutate(requestData, {
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
          navigate("/categories");
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
        <Text>Add new category</Text>
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
                  src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  alt=""
                  width={"400px"}
                  height={"400px"}
                />
              )}
            </Grid.Col>
            <Grid.Col>
              <form
                onSubmit={form.onSubmit((values) => {
                  handleCategory(values);
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
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                  
                    <TextInput
                      name="name"
                      label="Category Name"
                      placeholder="Enter Category Name"
                      withAsterisk
                      {...form.getInputProps("category_name")}
                      radius={"100px"}
                      height={"45px"}
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  
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
                      Upload Category {isLoading && <Spinner width="25px" />}
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
