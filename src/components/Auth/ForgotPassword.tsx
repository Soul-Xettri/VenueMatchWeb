import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Container,
  Group,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import TopHeader from "../HomePage/HomeHeaderSection/TopHeader";
import Header from "../HomePage/HomeHeaderSection/Header";
import Footer from "../HomePage/FooterSection/Footer";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export function ForgotPassword() {
  const { classes } = useStyles();

  return (
    <>
    <div className="home-header-section">
    <TopHeader />
    <Header />
    <div className="home-header-section">
      <div
        className="home-banner-section overflow-hidden position-relative"
        style={{ paddingTop: "0" }}
      >
        <figure className="banner-img1 mb-0">
          <img
            src="../src/assets/images/banner-img1.png"
            alt=""
            className="star"
          />
        </figure>
        <figure className="banner-img2 mb-0">
          <img
            src="../src/assets/images/banner-img2.png"
            alt=""
            className="star"
          />
        </figure>
    <section className="form-section overflow-hidden" style={{padding:0,background:"transparent"}}>
    
    <Container size={460} my={30}>
      <Title className={classes.title} align="center" style={{fontWeight:"normal"}}>
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="me@mantine.dev" required  radius={"100px"}
              height={"45px"}/>
        <Group position="apart" mt="lg" className={classes.controls}>
          {/* <Anchor color="dimmed" size="sm" className={classes.control}> */}
            <Center inline>
              <IconArrowLeft size={rem(12)} stroke={1.5} />
              <Box ml={5}>
                <Link to="/auth">Back to the login page</Link>
              </Box>
            </Center>
          {/* </Anchor> */}
          <div className="banner-btn discover-btn-banner">
          <button type="submit"  className="btn btn-primary" style={{width:"100%",paddingTop:"10px",paddingBottom:"10px"}}>
              Reset password
            </button>
          </div>
        </Group>
      </Paper>
    </Container>
    </section>
    </div>
    </div>
    </div>
    <Footer />

    </>
  );
}
