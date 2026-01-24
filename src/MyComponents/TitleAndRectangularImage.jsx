

import image from '../Images/about.jpg';



export function TitleAndRectangularImage() {


  return (
    <div>

    
      <div className="about-description">
        <div className="about-left">
          <h1>The Art Behind Canvas Market</h1>
          <p>
            Canvas Market connects talented artists with art lovers who value
            creativity and originality. We believe art is more than decoration—
            it’s expression, emotion, and identity.
          </p>
        </div>

        <div className="about-image">
          <img src={image} alt="painting" />
        </div>
      </div>

    

    </div>
  );
};


