
export default function InstagramFeeds() {
  return (
    <section className="insta-feed-section">
    <figure className="mb-0 insta-feed-img">
        <img src="../src/assets/images/app.png" alt="" className="img-fluid star"/>
    </figure>
  <div className="container">
      <div className="row">
          <div className="col-lg-12">
            <figure className="mb-0 insta-bird-fig">
                <img src="../src/assets/images/insta-bird-img.png" alt="" className="star"/>
            </figure>
            <figure className="insta-fig">
                <img src="../src/assets/images/ring-icon-banner.png" alt=""/>
            </figure>
          </div>
      </div>
      <h2>Venue Match Feed</h2>
      <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-6">
            <figure className="mb-0 insta-section-imgs">
                <img src="../src/assets/images/welcome.png" alt="" className="img-fluid"/>
                
            </figure>
          </div>
          <div className="col-lg-3 col-md-3 col-fluid sm-6">
            <figure className="mb-0 insta-section-imgs">
                <img src="../src/assets/images/login.png" alt="" className="img-fluid"/>
                
            </figure>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6">
            <figure className="mb-0 insta-section-imgs insta-section-imgs-mb">
                <img src="../src/assets/images/signup.png" alt="" className="img-fluid"/>
                
            </figure>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6">
            <figure className="mb-0 insta-section-imgs insta-section-imgs-mb">
                <img src="../src/assets/images/khalti.png" alt="" className="img-fluid"/>
                
            </figure> 
        </div>
      </div>
  </div>
</section>
  )
}
