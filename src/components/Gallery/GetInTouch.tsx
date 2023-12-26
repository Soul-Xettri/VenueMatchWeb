import { Link } from "react-router-dom";


export default function GetInTouch() {
  return (
    <div className="get-in-touch gallery-page">
    <div className="container">
        <div className="row aos-init" data-aos="fade-up">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12">
                <div className="gallery_content">
                   <figure className="contact-form-img">
                       <img src="../src/assets/images/couple1.png" alt="" className="img-fluid"/>
                   </figure>
                    <div className="banner-btn discover-btn-banner">
                        <Link to="#" className="text-decoration-none">Venue Match</Link>
                    </div>
                    <h4>WATER FRONT RESORT</h4>
                    <p>LAKESIDE</p>
                </div>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
                <div className="gallery_content gallery_content-mb">
                    <figure className="contact-form-img">
                        <img src="../src/assets/images/pokharaGrande2.png" alt="" className="img-fluid"/>
                    </figure>
                     <div className="banner-btn discover-btn-banner">
                         <Link to="#" className="text-decoration-none">Venue Match</Link>
                     </div>
                    <h4 className="h4-mb">HOTEL GRANDEE</h4>
                    <p>BIRAUTA</p>
                 </div>
                 <figure className="gallery-img3">
                    <img src="../src/assets/images/siris.png" alt="" className="img-fluid"/>
                </figure>
            </div>
        </div>
        {/* <!-- row2 --> */}
        <div className="row aos-init" data-aos="fade-up">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                <div className="gallery_content">
                   <figure className="contact-form-img">
                       <img src="../src/assets/images/susmita.png" alt="" className="img-fluid"/>
                   </figure>
                    <div className="banner-btn discover-btn-banner">
                        <Link to="#" className="text-decoration-none">Venue Match</Link>
                    </div>
                    <h4>Susmita & Santosh</h4>
                    <p>Lakeside Retreat</p>
                </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                <div className="gallery_content gallery_content-mb gallery-bottom">
                    <figure className="contact-form-img">
                        <img src="../src/assets/images/arya.png" alt="" className="img-fluid"/>
                    </figure>
                     <div className="banner-btn discover-btn-banner">
                         <Link to="#" className="text-decoration-none">Venue Match</Link>
                     </div>
                     <h4>ARYA</h4>
                     <p>Rabi Mahal</p>
                 </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                <div className="gallery_content gallery_content-mb">
                    <figure className="contact-form-img">
                        <img src="../src/assets/images/anup.png" alt="" className="img-fluid"/>
                    </figure>
                     <div className="banner-btn discover-btn-banner">
                         <Link to="#" className="text-decoration-none">Venue Match</Link>
                     </div>
                     <h4>Siris & Anoop</h4>
                     <p>Water Front Resort</p>
                 </div>
            </div>
        </div>
        <div className="banner-btn discover-btn-banner">
            <Link to="#" className="text-decoration-none">Make Reservations</Link>
        </div>
    </div>
    <figure className="gallery-design-img">
        <img src="../src/assets/images/gallery-design-img.png" alt=""/>
    </figure>
</div>
  )
}
