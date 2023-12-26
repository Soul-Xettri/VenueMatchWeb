import Category from "./Categories/Category";
import Event from "./EventSection/Event";
import Footer from "./FooterSection/Footer";
import RegisterForm from "./FormSection/RegisterForm";
import AboutSection from "./HomeHeaderSection/AboutSection";
import Header from "./HomeHeaderSection/Header";
import HeroSection from "./HomeHeaderSection/HeroSection";
import TopHeader from "./HomeHeaderSection/TopHeader";
import InstagramFeeds from "./InstaFeeds/InstagramFeeds";
import Reservation from "./ReservationSection/Reservation";
import VedioSection from "./VedioSection/VedioSection";

export default function Home() {
  return (
    <div>
        <div className="home-header-section">
          <TopHeader />
          <Header />
      <div className="home-header-section">
        <HeroSection />
        <AboutSection />
      </div>
      <div className="video-section">
        <VedioSection />
      </div>
      <Category />
      <Reservation />
      <Event />
      <RegisterForm />
      <InstagramFeeds />
      <Footer />

     </div>
    </div>
  );
}
