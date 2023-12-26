import {
    createStyles,
    Title,
    Text,
    Button,
    Container,
    Group,
    rem,
  } from "@mantine/core";
import { Link } from "react-router-dom";
import TopHeader from "../HomePage/HomeHeaderSection/TopHeader";
import Header from "../HomePage/HomeHeaderSection/Header";
import Footer from "../HomePage/FooterSection/Footer";
  
  const useStyles = createStyles((theme) => ({
    root: {
      paddingTop: rem(80),
      paddingBottom: rem(80),
    },
  
    label: {
      textAlign: "center",
      fontWeight: 900,
      fontSize: rem(220),
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
      fontSize: rem(38),
  
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
  
  export function Error404() {
    const { classes } = useStyles();
  
    return (
      <>
      <div className="home-header-section">
      <TopHeader />
      <Header />
        <div className="home-header-section">
        <div
          className="home-banner-section overflow-hidden position-relative"
          style={{ paddingTop: "0" ,paddingBottom:"0"}}
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
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>You have found a secret place.</Title>
        <Text
          color="dimmed"
          size="lg"
          align="center"
          className={classes.description}
        >
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
        <Group position="center">
            <Link to = "/">
          <Button variant="subtle" size="md">
            Take me back to home page
          </Button>
          </Link> 
        </Group>
      </Container>
      </div></div>
      </div>
        <Footer />
        </>
    );
  }
  