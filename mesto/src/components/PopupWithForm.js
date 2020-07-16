import React from 'react';

function PopupWithForm(props) {
  // console.log(props);
  return (
    <>
      <section className={`popup popup__${props.name} ${props.isOpen}`}>
        <form className={`popup-container popup-container__${props.name}`} name="form" method="POST" action="#" noValidate>
          <h2 className="popup-container__text">{props.title}</h2>
          <fieldset className="popup-container__info">
            {props.children}
            <button className="popup-container__button-add" type="submit">{props.add}</button>
          </fieldset>
          <button className="popup-container__button-reset" type="reset" aria-label="Close"></button>
        </form>
      </section>
    </>
  )
}

export default PopupWithForm;
