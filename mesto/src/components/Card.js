import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <>
      <div className="element">
        <img className="element__image" alt="Изображение" src={props.card.link} onClick={handleClick} />
        <div className="element__places">
          <h2 className="element__place">{props.card.name}</h2>
          <div className="element__likes">
            <button className="element__button" type="button"></button>
            <span className="element__count"> {props.card.likes.length > 0 ? `${props.card.likes.length}` : 0} </span>
          </div>
        </div>
        <button className="element__trash" type="button"></button>
      </div>
    </>
  )
}

export default Card;
