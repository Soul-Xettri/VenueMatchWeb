import { Link } from "react-router-dom";

export default function VedioSection() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="video-section-conten aos-init" data-aos="fade-up">
            <figure className="mb-0 video-section-image">
              <img
                src="../src/assets/images/video-img.png"
                alt=""
                className="fluid-img"
              />
            </figure>
            <Link
              className="popup-vimeo"
              to="https://previews.customer.envatousercontent.com/h264-video-previews/5afc8770-eb05-42ec-b854-9fb6b3bb52c5/40068661.mp4"
            >
              <figure className="mb-0 vide-play-img">
                <img
                  src="../src/assets/images/video-play-icon.png"
                  alt=""
                  className="fluid-img"
                />
              </figure>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
