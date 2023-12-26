import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Group,
  Divider,
  Stack,
} from "@mantine/core";
// import { FacebookButton, GoogleButton } from "../SocialButtons/SocialButtons";
import { Link, useNavigate } from "react-router-dom";
import { isEmail, useForm } from "@mantine/form";
import { PostQuery } from "../utils/ApiCall";
import { LOGIN } from "../utils/ApiRoutes";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Spinner from "../Spinner/Spinner";
import { showNotification } from "@mantine/notifications";
const handleLoginPost = async (data: any) => {
  return (await PostQuery(LOGIN, data))?.data;
};

export function Login() {
  const form = useForm({
    initialValues: {
      email: Cookies.get("rememberedEmail") || "", // Get the remembered email from the cookie
      password: Cookies.get("rememberedPassword") || "",// Get the remembered password from the cookie
      remember: false,
    },

    validate: {
      email: isEmail("Invalid Email"),

      // password: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid password"),
    },
  });

  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(handleLoginPost);
  const handleLogin = (data: any) => {
    mutate(data, {
      onSuccess: async (data) => {
        if (data.error === true) {
          showNotification({
            title: "Login Error",
            message: data.message,
            color: "red",
          });
        } else {
          if (form.values.remember === true) {
            Cookies.set("rememberedEmail", data.email, { expires: 365 });
            Cookies.set("rememberedPassword", data.password, { expires: 365 }); // Store email & password for 1 year (adjust as needed)
          } else {
            // If not checked, remove the email from the cookie
            Cookies.remove("rememberedEmail");
            Cookies.remove("rememberedPassword");
          }
          Cookies.remove("apikey");
          Cookies.set("apikey", data.apiKey);
          Cookies.set("role", data.role);
          if (data.role === "admin") {
            showNotification({
              title: "Login Success",
              message: "Welcome Back Admin, Please Wait",
              color: "green",
            });
            // Delay the page reload by 1 second (1000 milliseconds)
            setTimeout(() => {
              window.location.href = "/admin";
            }, 1000);
          } else if (data.role === "venue_owner") {
            showNotification({
              title: "Login Sucess",
              message: "Welcome Back Venue Owner, Please wait",
              color: "green",
            });
            setTimeout(() => {
              window.location.href = "/venue-owner";
            }, 1000);
          } else {
            showNotification({
              title: "Access Denied",
              message: "User role is low ",
              color: "red",
            });
            navigate("/");
          }
        }
      },
      onError: async (error: any) => {
        console.log(error.data.response);
      },
    });
  };

  return (
    <section className="form-section overflow-hidden" style={{ padding: 0 }}>
      {/* <Divider label="Log in with" labelPosition="center" my="lg" />
      <Group grow mb="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <FacebookButton radius="xl">FaceBook</FacebookButton>
      </Group> */}
      <Divider label="Venue Match" labelPosition="center" my="lg" />
      <Paper withBorder shadow="md" p={30} radius="md">
        <form
          onSubmit={form.onSubmit((values) => {
            handleLogin(values);
          })}
        >
          <Stack>
            <TextInput
              label="Email"
              placeholder="Enter Email"
              {...form.getInputProps("email")}
              radius={"100px"}
              height={"45px"}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter Password"
              {...form.getInputProps("password")}
              radius={"100px"}
              height="45px"
            />
            <Group position="apart">
              <Checkbox
                checked={form.values.remember}
                {...form.getInputProps("remember")}
                label="Remember me"
              />
              <Anchor component="button" size="sm">
                <Link to="forgot-password">Forgot password?</Link>
              </Anchor>
            </Group>
            <div className="banner-btn discover-btn-banner">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "100%",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                Sign in {isLoading && <Spinner width="25px" />}
              </button>
            </div>
          </Stack>
        </form>
      </Paper>
    </section>
  );
}
