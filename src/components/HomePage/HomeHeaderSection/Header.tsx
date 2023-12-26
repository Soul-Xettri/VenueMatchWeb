// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  Burger,
  Divider,
  Drawer,
  ScrollArea,
  createStyles,
  em,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../../../assets/images/download.png"

const useStyles = createStyles((theme) => ({
  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  hiddenTab: {
    [`@media (max-width: ${em(876)})`]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan(`${em(991)}`)]: {
      display: "none",
    },
  },

  toggle: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  toggleFixed: {
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[3],
    },
  },
}));
export default function Header() {
  const [toggle] = useState(true);
  const { classes } = useStyles();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <>
      <header className="header">
        <div className="main-header">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light p-0">
              <Link className="navbar-brand pt-0" to="/">
                <img
                  src={logo}
                  alt=""
                  className="img-fluid diverge-logo okxa"
                />
              </Link>
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                className={classes.hiddenDesktop}
              />
       
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <NavLink
                      className="nav-link text-decoration-none navbar-text-color home-margin-top"
                      to="/"
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "#9accc9" : "black",
                        };
                      }}
                    >
                      Home<span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/venues"
                      className="nav-link text-decoration-none navbar-text-color"
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "#9accc9" : "black",
                        };
                      }}
                    >
                      Venues
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-decoration-none navbar-text-color"
                      to="/about"
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "#9accc9" : "black",
                        };
                      }}
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-decoration-none navbar-text-color"
                      to="/gallery"
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "#9accc9" : "black",
                        };
                      }}
                    >
                      Gallery
                    </NavLink>
                  </li>
                  {/* <li className="nav-item navbar-text-color"><Link className="nav-link text-decoration-none contact-us-margin navbar-text-color" to ="pricing.html">Pricing</Link></li> */}
                  <li
                    className={
                      toggle
                        ? "nav-item dropdown redlight-dropdown"
                        : "nav-item dropdown redlight-dropdown show"
                    }
                  >
                   
                    <div
                      className={
                        toggle
                          ? "dropdown-menu dropdown-content-redlight"
                          : "dropdown-menu dropdown-content-redlight show"
                      }
                    >
                      <ul className="list-unstyled">
                        <li className="nav-item">
                          {" "}
                          <Link
                            className="dropdown-item nav-link"
                            to="/birthday"
                          >
                            Birthday
                          </Link>
                        </li>
                        <li className="nav-item">
                          {" "}
                          <Link
                            className="dropdown-item nav-link"
                            to="/wedding"
                          >
                            Wedding
                          </Link>
                        </li>
                        <li className="nav-item">
                          {" "}
                          <Link
                            className="dropdown-item nav-link"
                            to="/meeting"
                          >
                            Meetings
                          </Link>
                        </li>
                        <li className="nav-item">
                          {" "}
                          <Link
                            className="dropdown-item nav-link"
                            to="/engagement"
                          >
                            Engagement
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <div className="btn-talk ml-auto">
                  <ul className="m-0 p-0">
                    <li className="list-unstyled d-lg-inline-block">
                      <Link className="nav-link contact" to="/auth">
                        Login / Signup
                      </Link>
                    </li>
                    {/* <li className="icon-search">
                      <Link to="" className="text-decoration-none play-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="VENUE MATCH"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color="red" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "20px",
            }}
          >
            <NavLink
              to="/"
              onClick={closeDrawer}
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "normal" : "normal",

                  color: isActive ? "#9accc9" : "black",
                  margin: isPending ? "0" : "5px 0px",
                };
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/venues"
              onClick={closeDrawer}
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "normal" : "normal",

                  color: isActive ? "#9accc9" : "black",
                  margin: isPending ? "0" : "5px 0px",
                };
              }}
            >
              Venues
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeDrawer}
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "normal" : "normal",

                  color: isActive ? "#9accc9" : "black",
                  margin: isPending ? "0" : "5px 0px",
                };
              }}
            >
              About
            </NavLink>
            <NavLink
              to="/gallery"
              onClick={closeDrawer}
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "normal" : "normal",
                  color: isActive ? "#9accc9" : "black",
                  margin: isPending ? "0" : "5px 0px",
                };
              }}
            >
              Gallery
            </NavLink>
          </div>
          <Divider my="sm" color="red" />
          <NavLink
              to="/auth"
              onClick={closeDrawer}
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "normal" : "normal",
                  color: isActive ? "#9accc9" : "black",
                  margin: isPending ? "0" : "5px 0px",
                };
              }}
            >
          <section className="form-section" style={{padding:"10px",background:"none"}}>
          <div className="banner-btn discover-btn-banner">
            <button type="submit"  className="btn btn-primary" style={{width:"100%",paddingTop:"10px",paddingBottom:"10px"}}>
              Sign in
            </button>
          </div>
          </section>
          </NavLink>
        </ScrollArea>
      </Drawer>
    </>
  );
}
