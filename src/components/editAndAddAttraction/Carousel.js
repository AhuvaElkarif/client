import { Component, useState } from 'react';
import SimpleModalSlideshow from 'react-modal-slideshow';
 
export default function SomeComponent()  {
  /* (...) */
    const [open,setOpen] = useState(true);
    const [currentSlide, setCurrentSlide] = useState();
    return (
      <SimpleModalSlideshow
        slides={[{
        title: (
          <h2>Title</h2>
        ),
        media: (
            <img src="https://unsplash.it/600/400?image=0" />
          ),
          content: (
            <div>
              Donec id elit non mi porta gravida at eget metus.
              Sed posuere consectetur est at lobortis.
            </div>
          ),
        }, {
          title: (
            <h2>Title</h2>
          ),
          media: (
            <img src="https://unsplash.it/600/400?image=1" />
          ),
          content: (
            <div>
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              Donec ullamcorper nulla non metus auctor fringilla.
              Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </div>
          ),
        }]}
        open={open}
        currentSlide={currentSlide}
        // onClose={::this.handleClose}
        // onNext={::this.handleNext}
        // onPrev={::this.handlePrev}
      />
    );
}