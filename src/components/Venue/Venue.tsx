import { useQuery } from "@tanstack/react-query";
import { FetchQuery } from "../utils/ApiCall";
import { VENUES } from "../utils/ApiRoutes";
import { VenueCard } from "./VenueCard";
import { Image, SimpleGrid } from "@mantine/core";
import TopHeader from "../HomePage/HomeHeaderSection/TopHeader";
import Header from "../HomePage/HomeHeaderSection/Header";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import Footer from "../HomePage/FooterSection/Footer";
const fetchVenue = async () => {
  return await FetchQuery(VENUES);
};
export default function Venue() {
  const { isLoading, data } = useQuery(["venues"], fetchVenue);


  return (
    <>
      <div className="home-header-section sub-header-section">
        <TopHeader />
        <Header />
          <div
            className="home-banner-section overflow-hidden position-relative"
            style={{ paddingTop: "0",paddingBottom:"0" }}
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

            <div className="venueCategory">
              <SimpleGrid
                cols={6}
                spacing="28px"
                verticalSpacing="50px"
                breakpoints={[
                  {
                    maxWidth: "70rem",
                    cols: 3,
                    spacing: "60px",
                    verticalSpacing: "60px",
                  },
                  { maxWidth: "48rem", cols: 3, spacing: "50px" },
                  { maxWidth: "36rem", cols: 3, spacing: "sm" },
                ]}
              >
                  <Link to="#">
                <div className="categoryCard">
                  <Image
                    src={"../src/assets/images/wedding.png"}
                    style={{ width: "40%" }}
                  />
                  <p style={{paddingTop:"15px",marginBottom:0}}>Wedding</p>
                </div>
                  </Link>
                  <Link to="#">
                <div className="categoryCard">
                  <Image
                    src={"../src/assets/images/birthday.png"}
                    style={{ width: "40%" }}
                  />
                  <p style={{paddingTop:"15px",marginBottom:0}}>Birthday</p>
                </div>
                </Link>
                <Link to="#">
                <div className="categoryCard">
                  <Image
                    src={"../src/assets/images/wedding-ring.png"}
                    style={{ width: "40%" }}
                  />
                  <p style={{paddingTop:"5px",marginBottom:0}}>Engagement</p>
                </div>
                </Link>
                <Link to="#">
                <div className="categoryCard">
                  <Image
                    src={"../src/assets/images/meeting.png"}
                    style={{ width: "40%" }}
                  />
                  <p style={{paddingTop:"15px",marginBottom:0}}>Formal</p>
                </div>
                </Link>
                <Link to="#">
                <div className="categoryCard">
                  <Image
                    src={"../src/assets/images/concert.png"}
                    style={{ width: "40%" }}
                  />
                  <p style={{paddingTop:"5px",marginBottom:0}}>Concert</p>
                </div>
                </Link>
                <Link to="#">
                <div className="categoryCard">
                  <Image
                    src={"../src/assets/images/festival.png"}
                    style={{ width: "40%" }}
                  />
                  <p style={{paddingTop:"5px",marginBottom:0}}>Festival</p>
                </div>
                </Link>
              </SimpleGrid>
            {/* <Divider
            my="sm"
            color="#00000"
            mt="40px"
          /> */}
            </div>

            
        {isLoading && <Spinner width="50px"/>}

            <div className="venueCard">
              <SimpleGrid
                cols={4}
                spacing="28px"
                verticalSpacing="50px"
                breakpoints={[
                  {
                    maxWidth: "70rem",
                    cols: 2,
                    spacing: "60px",
                    verticalSpacing: "60px",
                  },
                  { maxWidth: "48rem", cols: 2, spacing: "50px" },
                  { maxWidth: "36rem", cols: 1, spacing: "sm" },
                ]}
              >
                {data &&
                  data?.data.venues.map((venue: any) => (
                    <div key={venue.id}>
                      <VenueCard
                        image={venue.image?venue.image:`../src/assets/images/venue-match-logo .png`}
                        name={venue.name}
                        location={venue.location}
                        price={venue.price}
                        id={venue.id}
                      />
                    </div>
                  ))}
              </SimpleGrid>
            </div>
          </div>
          
      </div>
      <Footer/>
      </>
    
  );
}
