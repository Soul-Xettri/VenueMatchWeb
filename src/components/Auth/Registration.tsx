import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Divider,
  Checkbox,
  Stack,
  InputBase,
} from "@mantine/core";

// import { FacebookButton, GoogleButton } from "../SocialButtons/SocialButtons";
import { hasLength, isEmail, matchesField, useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import { PostQuery } from "../utils/ApiCall";
import { SIGNUP } from "../utils/ApiRoutes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { showNotification } from "@mantine/notifications";
import { IconChevronDown } from "@tabler/icons-react";

const handlRegisterationPost = async (data: any) => {
  return (await PostQuery(SIGNUP, data))?.data;
};
export function Registration() {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      // mobileNumber: "",
      password: "",
      confirmPassword: "",
      terms: false,
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
      terms: (termsCheck) =>
        termsCheck === false ? "Check the terms and conditions" : null,
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
            title: "Registeration Error",
            message: data.message,
            color: "red",
          });
        } else {
          showNotification({
            title: "Registeration Success",
            message: data.message,
            color: "green",
          });
          navigate("/success");
        }
      },
    });
  };

  return (
    <section className="form-section overflow-hidden" style={{ padding: 0 }}>
      {/* <Divider label="Sign up with" labelPosition="center" my="lg" />
      <Group grow mb="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <FacebookButton radius="xl">FaceBook</FacebookButton>
      </Group> */}
      <Divider label="Venue Match" labelPosition="center" my="lg" />
      <Paper withBorder shadow="md" p={30} radius="md">
        <form
          onSubmit={form.onSubmit((values) => {
            handleRegister(values);
          })}
        >
          <Stack>
            <TextInput
              name="firstName"
              label="First Name"
              placeholder="Enter First Name"
              withAsterisk
              {...form.getInputProps("firstName")}
              radius={"100px"}
              height={"45px"}
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
              rightSection={<IconChevronDown size={14} stroke={1.5} />}
            >
              {" "}
              <option value="" disabled hidden>
                I am
              </option>
              <option value="user">Client</option>
              <option value="venue_owner">Venue Owner</option>
            </InputBase>
            <Group>
              <Checkbox
                checked={form.values.terms}
                {...form.getInputProps("terms")}
              />
              <Link to="/">I accept terms and conditions</Link>
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
                Sign up {isLoading && <Spinner width="25px" />}
              </button>
            </div>
          </Stack>
        </form>
      </Paper>
    </section>
  );
}
