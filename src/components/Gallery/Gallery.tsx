import Footer from "../HomePage/FooterSection/Footer";
import Header from "../HomePage/HomeHeaderSection/Header";
import TopHeader from "../HomePage/HomeHeaderSection/TopHeader";
import InstagramFeeds from "../HomePage/InstaFeeds/InstagramFeeds";
import GalleryTop from "./GalleryTop";
import GetInTouch from "./GetInTouch";

export default function Gallery() {
  return (
    <div className="home-header-section sub-header-section">
      <TopHeader />
      <Header />
      <GalleryTop />
      <GetInTouch />
      <InstagramFeeds/>
      <Footer/>
    </div>
  );
}
