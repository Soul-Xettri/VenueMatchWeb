import { Link } from "react-router-dom";

export default function Reservation() {
  return (
    <div className="reservation-section overflow-hidden">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <figure className="mb-0 reservation-logo">
                        <img src="../src/assets/images/event-design-logo.png" alt=""/>
                    </figure>
                    <h2 className="text-center">Popular Venues</h2>
                </div>
            </div>
            <div className="row aos-init aos-animate" data-aos="fade-up">
                <div className="col-lg-7 col-md-6 col-sm-12">
                    <figure className="mb-0 reservation-img1">
                        <img src="../src/assets/images/grandee.png" alt="" className="img-fluid"/>
                    </figure>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-12">
                    <figure className="reservation-img2">
                        <img src="../src/assets/images/waterfront.png" alt="" className="img-fluid"/>
                    </figure>
                    <figure className="mb-0 reservation-img3">
                        <img src="../src/assets/images/rabimahal.png" alt="" className="img-fluid"/>
                    </figure>
                </div>
            </div>

            <div className="banner-btn discover-btn-banner">
                <Link to="/venues" className="text-decoration-none">Make Reservations</Link>
            </div>
        </div>
    </div>
  )
}
