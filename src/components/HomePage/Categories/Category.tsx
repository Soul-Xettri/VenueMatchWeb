import { Link } from "react-router-dom";

export default function Category() {
  return (
    <section className="categories-section overflow-hidden position-relative">
        <figure className="hearts-img">
            <img src="../src/assets/images/categories-img1.png" alt="" className="star"/>
        </figure>
        <figure className="design-img">
            <img src="../src/assets/images/categories-img6.png" alt="" className="star"/>
        </figure>
        <div className="container">
            <div className="row" style={{marginLeft:"-25px"}}>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 order-lg-1 order-1">
                    <div className="about-us-content aos-init aos-animate" data-aos="fade-up">
                        <div className="cate-icon-outer">
                            <figure className="cate-icon-img mb-0">
                                <img src="../src/assets/images/categories-logo-img.png" alt=""/>
                            </figure>
                        </div>
                        <h2>Includes Various Categories
                        </h2>
                        <p className="aboutus-p">
                            Explore different categories.</p>
                        <div className="banner-btn discover-btn-banner">
                            <Link to="/venues" className="text-decoration-none">learn more</Link>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-5 col-md-12 col-sm-12 order-lg-2 order-2">
                    <div className="about-content-img">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="card card1">
                                    <figure className="mb-0 category-section-f2"><img src="../src/assets/images/wedding.png" alt=""/></figure>
                                    <h6>Wedding</h6>
                                </div>
                                <div className="card card2">
                                    <figure className="mb-0 category-section-f3"><img src="../src/assets/images/birthday.png" alt=""/></figure>
                                    <h6>Birthday</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="card card3">
                                    <figure className="mb-0 category-section-f4"><img src="../src/assets/images/meeting.png" alt=""/></figure>
                                    <h6>Meeting</h6>
                                </div>
                                <div className="card card4">
                                    <figure className="mb-0 category-section-f5"><img src="../src/assets/images/engagement.png" alt=""/></figure>
                                    <h6>Engagemnet</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
