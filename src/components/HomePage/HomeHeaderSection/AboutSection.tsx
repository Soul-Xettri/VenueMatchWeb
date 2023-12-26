import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <div>
      {" "}
      <div className="about-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 order-lg-1 order-1">
              <div className="about-us-content aos-init" data-aos="fade-up">
                <h5 className="autorix-text">
                  <span>About Venue Match</span>
                </h5>
                <h2>What We do, We do With Passion</h2>
                <p className="aboutus-p">
                Whether you're planning a wedding, corporate conference, or social gathering, our comprehensive venue management services are designed to make your event a resounding success.{" "}
                </p>
                <div className="banner-btn discover-btn-banner">
                  <Link to ="/about" className="text-decoration-none">
                    learn more
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5 col-md-12 col-sm-12 order-lg-2 order-2">
              <div className="about-content-img">
                <figure className="mb-0 about-section-f1">
                  <img
                    src="../src/assets/images/about-bird-icon.png"
                    alt=""
                    className="star"
                  />
                </figure>
                <figure className="mb-0 about-section-f2">
                  <img src="../src/assets/images/about1.png" alt="" />
                </figure>
                <figure className="mb-0 about-section-f3">
                  <img src="../src/assets/images/about2.png" alt="" />
                </figure>
                <figure className="mb-0 about-section-f4">
                  <img src="../src/assets/images/about3.png" alt="" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
