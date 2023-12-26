import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faPinterestP,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
export default function TopHeader() {
  return (
    <div className="header-top header-top1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 d-md-block d-sm-none">
            {/* <div class="header-left d-table-cell align-middle">
                          <div class="phone-icon d-inline-block"><i class="fa-solid fa-phone-volume"></i></div><p class="free-consultation-text">For a free consultation:<a href="tel:+123456789" class="text-decoration-none">0800 123 45 67 890</a></p>
                        </div> */}
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="header-right float-md-right float-none">
              <ul className="list-unstyled">
                <li className="d-inline-block">
                  <a
                    className="d-inline-block email-span text-decoration-none"
                    href="mailto:info@sencare.com"
                  >
                    Folllow us on:
                  </a>
                </li>
                <li className="d-inline-block user-li">
                  <FontAwesomeIcon icon={faFacebookF} />
                </li>
                <li className="d-inline-block user-li">
                  <FontAwesomeIcon icon={faTwitter} />
                </li>
                <li className="d-inline-block user-li">
                  <FontAwesomeIcon icon={faPinterestP} />
                </li>
                <li className="d-inline-block user-li">
                  <FontAwesomeIcon icon={faInstagram} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
