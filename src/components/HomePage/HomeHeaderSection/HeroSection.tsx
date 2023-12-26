import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="home-banner-section overflow-hidden position-relative hero">
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
      <div className="banner-container-box">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-md-0 mb-4 text-md-left text-center order-lg-1 order-2">
              <div className="banner-img-content position-relative">
                <figure className="banner-img mb-0">
                  <img
                    className="img-fluid banner-img-width"
                    src="../src/assets/images/nepaliImagecouple.png"
                    alt=" "
                  />
                </figure>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 order-lg-2 order-1">
              <div
                className="home-banner-text position-relative aos-init"
                data-aos="fade-up"
                id="myContentDIV"
              >
                <figure className="ring-icon-img mb-0">
                  <img src="../src/assets/images/ring-icon-banner.png" alt="" />
                </figure>
                <h1>
                  VENUE MATCH{" "}
                  <span className="h1-text"> UNITING DREAMERS AND VENUES</span>
                </h1>
                <p className="banner-paragraph">
                  At Venue Match, we understand the importance of finding the
                  perfect venue for your event.
                </p>
                <div className="banner-btn discover-btn-banner">
                  <Link to="#" className="text-decoration-none">
                    <FontAwesomeIcon
                      icon={faClipboardList}
                      className="fa fa-clipboard-list"
                      style={{ marginRight: "4px" }}
                    />
                    Make Reservations
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
