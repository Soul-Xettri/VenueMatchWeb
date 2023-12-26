import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCaretRight, faClipboardList, faEnvelope, faG, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer-section">
      <div className="footer-inner">
        <figure className="mb-0 footer-hearts">
          <img
            src="../src/assets/images/footer-birds-img.png"
            alt=""
            className="star"
          />
        </figure>
        <div className="footer-msg floating-chat">
          <figure className="mb-0 footer-chat-img">
            <img src="../src/assets/images/footer-chat-img.png" alt="" />
          </figure>
        </div>
        <div className="container">
          <div className="footer-content-box">
            <div className="row">
              <div className="col-lg-1 col-md-1 col-sm-1 d-lg-block d-none"></div>
              <div className="col-lg-5 col-md-6 col-sm-12">
                <h3 className="planning-h3">Let’s Start Planning!</h3>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="banner-btn discover-btn-banner">
                  <Link to="/venues" className="text-decoration-none">
                  <FontAwesomeIcon icon={faClipboardList} style={{marginRight:"4px"}}/>Make Reservations
                  </Link>
                </div>
                <div className="learn-btn">
                  <Link to="/about" className="text-decoration-none">
                    learn more
                  </Link>
                </div>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-1 d-lg-block d-none"></div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-5 col-lg-4 col-md-6 col-sm-12">
              <div className="footer-right-box">
                <Link to="index.html" className="text-decoration-none">
                  <figure className="footer-logo">
                  <img
                  src="../src/assets/images/download.png"
                  alt=""
                  className="img-fluid diverge-logo okxa"
                  
                />
                  </figure>
                </Link>
                <p className="footer-section-text">
                  We offer exceptional spaces, professional services, and unforgettable experiences. Contact us today to bring your vision to life.
                </p>
                <ul className="list-unstyled footer-social-icons">
                  <li className="list-item">
                  <Link className="kcha" to="#">
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="marginLeft facebook fontawsomeFooter"
                      />
                    </Link>
                    <Link className="kcha" to="#">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="marginLeft twiter fontawsomeFooter"
                      />
                    </Link>
                    <Link className="kcha" to="#">
                      <FontAwesomeIcon
                        icon={faLinkedinIn}
                        className="marginLeft linkedin fontawsomeFooter"
                      />
                    </Link>
                    <Link className="kcha" to="#">
                      <FontAwesomeIcon
                        icon={faG}
                        className="marginLeft gmail fontawsomeFooter"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-1 d-xl-block d-none"></div>
            <div className="col-xl-3 col-lg-4 col-md-2 col-sm-12 d-lg-block d-none">
              <div className="company-text">
                <p className="company-title">Company</p>
                <ul className="list-unstyled footer-ul1">
                  <li>
                    <FontAwesomeIcon icon={faCaretRight}  style={{color:"#555555",marginRight:"6px"}}/>
                    <Link
                      to="/about"
                      className="text-decoration-none footer-link-p"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCaretRight}  style={{color:"#555555",marginRight:"6px"}}/>
                    <Link
                      to="#"
                      className="text-decoration-none footer-link-p"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCaretRight}  style={{color:"#555555",marginRight:"6px"}}/>
                    <Link
                      to="/gallery"
                      className="text-decoration-none footer-link-p"
                    >
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCaretRight}  style={{color:"#555555",marginRight:"6px"}}/>
                    <Link
                      to="#"
                      className="text-decoration-none footer-link-p"
                    >
                      Organizer
                    </Link>
                  </li>
                </ul>
                <ul className="list-unstyled footer-ul2">
                  <li>
                    <FontAwesomeIcon icon={faCaretRight}  style={{color:"#555555",marginRight:"6px"}}/>
                    <a
                      href="/"
                      className="text-decoration-none footer-link-p"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCaretRight}  style={{color:"#555555",marginRight:"6px"}}/>
                    <Link
                      to="#"
                      className="text-decoration-none footer-link-p"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCaretRight}  style={{color:"#555555",marginRight:"6px"}}/>
                    <Link
                      to="#"
                      className="text-decoration-none footer-link-p"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCaretRight}  style={{color:"#555555",marginRight:"6px"}}/>
                    <Link
                      to="#"
                      className="text-decoration-none footer-link-p"
                    >
                      Gallery Single
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 d-md-block d-none">
              <div className="footer-list footer-link contact-list">
                <div className="icon-list-box1">
                  <ul className="list-unstyled contact-us-ul">
                    <li className="list-item">
                    <FontAwesomeIcon icon={faPhoneVolume} className="fa-sharp fa-solid fa-phone-volume footer-location3" />
                      <p className="contact-title">Call Us: </p>
                      <Link
                        to="#"
                        className="text-decoration-none footer-link-auto"
                      >
                        (061)456-789-00
                      </Link>
                    </li>
                    <li className="list-item">
                    <FontAwesomeIcon icon={faEnvelope} className="fa fa-envelope footer-location3" />
                      <p className="contact-title">Email Us:</p>
                      <Link
                        to="#"
                        className="text-decoration-none footer-link-auto"
                      >
                        help@VenueMatch.com
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5 col-md-6 col-sm-12"></div>
            <div className="col-lg-7 col-md-6 col-sm-12">
              <p className="footer-end-text">
                Copyright ©2023 VenueMatch.com All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
