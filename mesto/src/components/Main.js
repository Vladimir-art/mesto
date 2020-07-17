import React from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';

function Main(props) {

  const [userInterface, setUserInterface] = React.useState({});

  React.useEffect(() => {
    api.getUserInterface('/users/me')
      .then((data) => {
        setUserInterface(data);
      })
  }, []);

  // console.log(userName.name);

  return (
    <>
      <main className="content">
          <section className="profile">
            <div className="profile__cover">
              <div className="profile__information">
                <figure className="profile__background" onClick={props.onEditAvatar}></figure>
                <img className="profile__avatar" src={userInterface.avatar} alt="Жак-Ив Кусто"/>
              </div>
              <div className="profile__info">
                <div className="profile__reg">
                  <h1 className="profile__author">{userInterface.name}</h1>
                  <button className="profile__button-edit" type="button" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__specialty">{userInterface.about}</p>
              </div>
            </div>
            <button className="profile__button-add" type="button" onClick={props.onAddPlace}></button>
          </section>

          <section className="elements">
          </section>
          <PopupWithForm title="Редактировать профиль" name="edit-form" add="Сохранить" isOpen={props.isOpen.editProfilePopup && 'popup_opened'} onClose={props.onClose} children={
            <>
              <input className="popup-container__infoform popup-container__infoform_author" id="author-input" name="author" value="имя" type="text"  placeholder="Автор" minLength="2" maxLength="40" pattern="[A-Za-zА-ЯЁа-яё -]{1,}" required/>
              <span className = "popup-container__input-error" id="author-input-error">Вы пропустили это поле.</span>
              <input className="popup-container__infoform popup-container__infoform_aboutyourself" id="job-input" name="job" value="деятельность" type="text"  placeholder="О себе"  minLength="2" maxLength="200" required/>
              <span className = "popup-container__input-error" id="job-input-error">Вы пропустили это поле.</span>
            </>
          } />
          <PopupWithForm title="Новое место" name="add-place" add="Создать" isOpen={props.isOpen.addPlacePopup && 'popup_opened'} onClose={props.onClose} children={
            <>
              <input className="popup-container__infoform popup-container__infoform_place-name" id="place-input" name="name" type="text" placeholder="Название" minLength="1" maxLength="30"  required/>
              <span className = "popup-container__input-error" id="place-input-error">Вы пропустили это поле.</span>
              <input className="popup-container__infoform popup-container__infoform_place-link" id="link-input" name="link" type="url" placeholder="Ссылка на картинку" required/>
              <span className = "popup-container__input-error" id="link-input-error"></span>
            </>
          } />
          <PopupWithForm title="Обновить аватар" name="avatar" add="Сохранить" isOpen={props.isOpen.editAvatarPopup && 'popup_opened'} onClose={props.onClose} children={
            <>
              <input className="popup-container__infoform popup-container__infoform_avatar-link" id="avatar-input" name="avatar" type="url" placeholder="Введите ссылку" required/>
              <span className = "popup-container__input-error" id="avatar-input-error"></span>
            </>
          } />
          <PopupWithForm title="Вы уверены?" name="verification" add="Да" />
          <ImagePopup />

      </main>
    </>
  )
}

export default Main
