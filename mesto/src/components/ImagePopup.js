import React from 'react';

function ImagePopup(props) {
  return (
    <>
      <section className={`popup popup__show-image ${props.isOpen}`}>
        <figure className="popup-image">
          <img className="popup-image__picture" src={props.card.link} alt="Изображение места"/>
          <figcaption className="popup-image__caption">{props.card.name}</figcaption>
          <button className="popup-container__button-reset popup-container__button-reset_image" type="reset" aria-label="Close" onClick={props.onClose}></button>
        </figure>
      </section>
    </>
  )
}

export default ImagePopup;
