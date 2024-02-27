import * as images from '../Images/Index'
export const Home = () => {
  return (
    <div>
       <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={images?.image1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={images?.image2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={images?.image3} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={images?.image4} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={images?.image5} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={images?.image6  } className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
