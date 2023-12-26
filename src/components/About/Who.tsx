import { Link } from "react-router-dom";

export default function Who() {
  return (
    
    <div className="about-section about-page" style={{paddingBottom:"0"}}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 order-lg-1 order-1">
                        <div className="about-us-content aos-init aos-animate" data-aos="fade-up">
                            <h5 className="autorix-text"><span className="ityped">Who We Are</span><span className="ityped-cursor">|</span></h5>
                            <h2>Planner for Your Perfect Wedding</h2>
                            <p className="aboutus-p">Lorem ipsum dolor sit amet consectetur adipiscing elit sed  doeiusm tempor incididunt donec quam felis ultri cies nec, pellentesque eu, pretium quis sem </p>
                            
                            <div className="banner-btn discover-btn-banner">
                                <Link to="#" className="text-decoration-none">Get a Free Quote</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12 order-lg-2 order-2">
                        <div className="about-content-img">
                            <figure className="mb-0 about-section-f1"><img src="../src/assets/images/about-bird-icon.png" alt="" className="star"/>
                            </figure>
                            <figure className="mb-0 about-banner-img"><img src="../src/assets/images/nanu (1).png" alt="" className=""/>
                            </figure>
                        </div>
                    </div>

                </div>
            </div>
        </div>

  )
}

