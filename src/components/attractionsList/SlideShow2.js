import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
const fadeImages = [
  {
      url: './boat.jpg',
      caption: 'Slide 1'
  },
  {
      url: './boat.jpg',
      caption: 'Slide 2'
  },
  {
      url: './boat.jpg',
      caption: 'Slide 3'
  },
];
const Slideshow2 = () => {
  return (
    <div className="slide-container">
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div className="each-fade" key={index}>
            <div className="image-container">
              <img src={fadeImage.url} />
            </div>
            <h2>{fadeImage.caption}</h2>
          </div>
        ))}
      </Fade>
    </div>
  )
}
export default Slideshow2;