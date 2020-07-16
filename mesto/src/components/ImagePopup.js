import React from 'react';

function ImagePopup() {
  return (
    <>
      <section className="popup popup__show-image">
        <figure className="popup-image">
          <img className="popup-image__picture" alt="Изображение места"/>
          <figcaption className="popup-image__caption"></figcaption>
          <button className="popup-container__button-reset popup-container__button-reset_image" type="reset" aria-label="Close"></button>
        </figure>
      </section>
    </>
  )
}

export default ImagePopup;
