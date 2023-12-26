import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createStyles,
  Title,
  Text,
  Container,
  Group,
  rem,
  Paper,
} from "@mantine/core";
import TopHeader from "../HomePage/HomeHeaderSection/TopHeader";
import Header from "../HomePage/HomeHeaderSection/Header";
import Footer from "../HomePage/FooterSection/Footer";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: "40px",
    color: "#f4a492",
    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export function SuccessSignUp() {
  const { classes } = useStyles();

  return (
    <>
      <div className="home-header-section">
      <TopHeader />
    <Header />
        <div className="home-header-section" style={{ maxHeight: "43.75rem" }}>
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
            <Container size={420} my={40} pt={50}>
            <section className="form-section overflow-hidden" style={{padding:0}}>
            <Paper withBorder shadow="md" p={30} radius="md">
              <div className={classes.label}>
                {" "}
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="tickIcon"
                  style={{ color: "#9accc9" }}
                />
              </div>
              <Title className={classes.title}>Success</Title>
              <Text
                color="dimmed"
                size="lg"
                align="center"
                className={classes.description}
              >
                Congratulations, your account <br/> has been successfully created.<br/>
              </Text>
              <Group position="center">
                {/* <Link to = "/">
            <Button variant="subtle" size="md">
              Take me back to home page
            </Button>
            </Link>  */}
              </Group>
              <Link to="/auth">
              <div className="banner-btn discover-btn-banner">
            <button type="submit"  className="btn btn-primary" style={{width:"100%",paddingTop:"10px",paddingBottom:"10px"}}>
             Continue
            </button>
            </div>
            </Link>
              </Paper>
              </section>
            </Container>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
