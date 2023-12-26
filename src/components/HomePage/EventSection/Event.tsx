import { Link } from "react-router-dom";

export default function Event() {
  return (
    <section className="event-section overflow-hidden position-relative">
        <div className="container" style={{display:"flex",justifyContent:"center"}}>
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 order-lg-2 order-2">
                    <div className="about-us-content aos-init aos-animate" data-aos="fade-up">
                        <div className="cate-icon-outer">
                            <figure className="cate-icon-img mb-0">
                                <img src="../src/assets/images/event-design-logo.png" alt=""/>
                            </figure>
                        </div>
                        <h2>Let’s Plan Your Next Venue With Us
                        </h2>
                        <p className="aboutus-p">With our expertise, attention to detail, and extensive network of partner venues, we can help you find and manage the ideal location for your next event.</p>
                        <div className="banner-btn discover-btn-banner">
                            <Link to="#" className="text-decoration-none">learn more</Link>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-5 col-md-5 col-sm-12 order-lg-1 order-1">
                    <div className="event-content-img aos-init aos-animate">
                       <ul className="list-unstyled mb-0">
                        <li>
                            <figure className="mb-0 icons-fig">
                                <img src="../src/assets/images/event-img1.png" alt=""/>
                            </figure>
                            <h6>Entertaintment</h6>
                        </li>
                        <li>
                            <figure className="mb-0 icons-fig">
                                <img src="../src/assets/images/event-img2.png" alt=""/>
                            </figure>
                            <h6>Dining</h6>
                        </li>
                    </ul>
                    <ul className="list-unstyled second mb-0">
                        <li>
                            <figure className="mb-0 icons-fig">
                                <img src="../src/assets/images/event-img3.png" alt=""/>
                            </figure>
                            <h6>Decor</h6>
                        </li>
                        <li>
                            <figure className="mb-0 icons-fig">
                                <img src="../src/assets/images/event-img4.png" alt=""/>
                            </figure>
                            <h6>Swag &amp; Gifting</h6>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
