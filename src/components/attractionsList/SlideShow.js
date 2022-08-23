import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const Slideshow = () => {
    const slideImages = [
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
    return (
         <div className="slide-container"> 

            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div className="each-slide" key={index}>
                        <div style={{ 'backgroundImage': `url(${slideImage.url})` }}>
                            <span>{slideImage.caption}</span>
                        </div>
                    </div>
                ))}
            </Slide>
                </div>
    )
}

export default Slideshow;