import { faCalendarDays, faEnvelope, faPeopleGroup, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RegisterForm() {
  return (
    <section className="form-section overflow-hidden">
    <figure className="hearts-img">
        <img src="../src/assets/images/categories-img1.png" alt="" className="star"/>
    </figure>
    <div className="container">
        <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <figure className="form-section-img">
                    <img src="../src/assets/images/form-section-img1.png" alt="" className="img-fluid"/>
                </figure>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="about-section-form position-relative aos-init aos-animate" data-aos="fade-up">
                    <figure className="cate-icon-img">
                        <img src="../src/assets/images/categories-logo-img.png" alt=""/>
                    </figure>
                    <h2 className="contact-us-title">Make Reservations</h2>
                    <p>"Discover the perfect venue for your event." </p>
                    <form id="form_id" method="post" action="./contact-form.php">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group contact-form-margin">
                                <FontAwesomeIcon icon={faUser}className="icons-form" /> <input type="text" className="form-control input-text" id="validationCustom01" placeholder="Your Name" required/>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group contact-form-margin">
                                <FontAwesomeIcon icon={faEnvelope}className="icons-form" /><input type="email" className="form-control input-text" id="validationCustom02" placeholder="Your Email" required/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group contact-form-margin">
                                     {/* <i className="fa fa-user-plus icons-form"></i>  */}
                                     <FontAwesomeIcon icon={faPeopleGroup} className=" icons-form"/> 
                                    <input type="text" className="form-control input-text" id="validationCustom03" placeholder="Guests" required/>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group contact-form-margin"><FontAwesomeIcon icon={faCalendarDays} className="icons-form"/>
                                    <select className="form-control">
                                        <option value="0"> Select Date:</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="form-group special">
                            <select className="form-control select-icon select-event">
                                <option value="0"> Select Event:</option>
                                <option>Wedding</option>
                                <option>Birthday</option>
                                <option>Engagement</option>
                                <option>Concert</option>
                                <option>Formal</option>
                            </select>
                        </div>
                        <div className="banner-btn discover-btn-banner">
                            <button type="submit" className="btn btn-primary">Make Reservations</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}
