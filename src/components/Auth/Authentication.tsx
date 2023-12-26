import { useState } from "react";
import { Tabs } from "@mantine/core";
import { Container } from "@mantine/core";
import { Login } from "./Login";
import { Registration } from "./Registration";
import TopHeader from "../HomePage/HomeHeaderSection/TopHeader";
import Header from "../HomePage/HomeHeaderSection/Header";
import Footer from "../HomePage/FooterSection/Footer";

export default function Authentication() {
  const [activeTab, setActiveTab] = useState<string | null>("first");
  return (
    <>
    <div className="home-header-section sub-header-section">
    <TopHeader />
    <Header />
   
      <div
        className="home-banner-section overflow-hidden position-relative"
        style={{ paddingTop: "0", paddingBottom:"0px" }}
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

        <Container size={420} my={40}>
          <Tabs
            value={activeTab}
            onTabChange={setActiveTab}
            // color="teal"
            defaultValue="first"
            my="md"
            style={{border:"#f4a492 !important"}}
          >
            <Tabs.List>
              <Tabs.Tab value="first" color="#f4a492">
                {" "}
                Sign in
              </Tabs.Tab>
              <Tabs.Tab value="second">Sign up</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first" pt="xs">
              <Login />
            </Tabs.Panel>

            <Tabs.Panel value="second" pt="xs">
              <Registration />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </div>
    </div>
            <Footer />
</>
  );
}
