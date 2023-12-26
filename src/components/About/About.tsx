import Footer from "../HomePage/FooterSection/Footer";
import Header from "../HomePage/HomeHeaderSection/Header";
import TopHeader from "../HomePage/HomeHeaderSection/TopHeader";
import Aboutheader from "./Aboutheader";
import Who from "./Who";

export default function About() {
  return (
    <div className="home-header-section">
      <TopHeader />
      <Header />
      <Aboutheader />

      <Who />

      <Footer />
    </div>
  );
}
