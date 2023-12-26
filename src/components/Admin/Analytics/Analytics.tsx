import {
    createStyles,
    Title,
    Text,
  
    Container,
    Group,
    rem,
    Grid,
  } from "@mantine/core";

import { AdminSideBar } from "../AdminSideBar";

  
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
      fontWeight: 400,
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
  
  export function Analytics() {
    const { classes } = useStyles();
  
    return (
        <>
          <Grid>
        <Grid.Col span="content"><AdminSideBar /></Grid.Col>
        <Grid.Col span={9} >
        <div className="home-header-section">
  
          <div className="home-header-section" style={{maxHeight:"43.75rem"}}>
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
        <Container className={classes.root}>
          <div className={classes.label}>   <img
                    src="../src/assets/images/comingsoon.gif"
                    alt=""
                    className="img-fluid diverge-logo okxa"
                  /></div>
          <Title className={classes.title}>More Coming Soon</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Unfortunately, this page is still in development.
          </Text>
          <Group position="center">
              {/* <Link to = "/">
            <Button variant="subtle" size="md">
              Take me back to home page
            </Button>
            </Link>  */}
          </Group>
        </Container>
        </div></div>
        </div>
        </Grid.Col>
      </Grid>
          </>
      );
  }
  