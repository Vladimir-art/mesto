import React from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function Main() {
  //попап сменить аватарку
  function handleEditAvatarClick() {
    document.querySelector('.popup__avatar').classList.add('popup_opened');
  };
  //попап редактировать профиль
  function handleEditProfileClick() {
    document.querySelector('.popup__edit-form').classList.add('popup_opened');
  };
  //попап загрузить новое место
  function handleAddPlaceClick() {
    document.querySelector('.popup__add-place').classList.add('popup_opened');
  };

  return (
    <>
      <main className="content">
          <section className="profile">
            <div className="profile__cover">
              <div className="profile__information">
                <figure className="profile__background" onClick={handleEditAvatarClick}></figure>
                <img className="profile__avatar" alt="Жак-Ив Кусто"/>
              </div>
              <div className="profile__info">
                <div className="profile__reg">
                  <h1 className="profile__author">Жак-Ив Кусто</h1>
                  <button className="profile__button-edit" type="button" onClick={handleEditProfileClick}></button>
                </div>
                <p className="profile__specialty">Исследователь океана</p>
              </div>
            </div>
            <button className="profile__button-add" type="button" onClick={handleAddPlaceClick}></button>
          </section>

          <section className="elements">
          </section>
          <PopupWithForm title="Редактировать профиль" name="edit-form" add="Сохранить" children={
            <>
              <input className="popup-container__infoform popup-container__infoform_author" id="author-input" name="author" value="имя" type="text"  placeholder="Автор" minLength="2" maxLength="40" pattern="[A-Za-zА-ЯЁа-яё -]{1,}" required/>
              <span className = "popup-container__input-error" id="author-input-error">Вы пропустили это поле.</span>
              <input className="popup-container__infoform popup-container__infoform_aboutyourself" id="job-input" name="job" value="деятельность" type="text"  placeholder="О себе"  minLength="2" maxLength="200" required/>
              <span className = "popup-container__input-error" id="job-input-error">Вы пропустили это поле.</span>
            </>
          } />
          <PopupWithForm title="Новое место" name="add-place" add="Создать" children={
            <>
              <input className="popup-container__infoform popup-container__infoform_place-name" id="place-input" name="name" type="text" placeholder="Название" minLength="1" maxLength="30"  required/>
              <span className = "popup-container__input-error" id="place-input-error">Вы пропустили это поле.</span>
              <input className="popup-container__infoform popup-container__infoform_place-link" id="link-input" name="link" type="url" placeholder="Ссылка на картинку" required/>
              <span className = "popup-container__input-error" id="link-input-error"></span>
            </>
          } />
          <PopupWithForm title="Обновить аватар" name="avatar" add="Сохранить" children={
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
