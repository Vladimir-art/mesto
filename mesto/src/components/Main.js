import React from 'react';

function Main() {

  return (
    <>
      <main className="content">
          <section className="profile">
            <div className="profile__cover">
              <div className="profile__information">
                <figure className="profile__background"></figure>
                <img className="profile__avatar" alt="Жак-Ив Кусто"/>
              </div>
              <div className="profile__info">
                <div className="profile__reg">
                  <h1 className="profile__author">Жак-Ив Кусто</h1>
                  <button className="profile__button-edit" type="button"></button>
                </div>
                <p className="profile__specialty"></p>
              </div>
            </div>
            <button className="profile__button-add" type="button"></button>
          </section>

          <section className="elements">
          </section>

          <section className="popup popup__edit-form">
            <form className="popup-container popup-container__author" name="form" method="POST" action="#" noValidate>
              <h2 className="popup-container__text">Редактировать профиль</h2>
              <fieldset className="popup-container__info">
                <input className="popup-container__infoform popup-container__infoform_author" id="author-input" name="author" value="имя" type="text"  placeholder="Автор" minLength="2" maxLength="40" pattern="[A-Za-zА-ЯЁа-яё -]{1,}" required/>
                <span className = "popup-container__input-error" id="author-input-error">Вы пропустили это поле.</span>
                <input className="popup-container__infoform popup-container__infoform_aboutyourself" id="job-input" name="job" value="деятельность" type="text"  placeholder="О себе"  minLength="2" maxLength="200" required/>
                <span className = "popup-container__input-error" id="job-input-error">Вы пропустили это поле.</span>
                <button className="popup-container__button-add" type="submit">Сохранить</button>
              </fieldset>
              <button className="popup-container__button-reset popup-container__button-reset_edit" type="reset" aria-label="Close"></button>
            </form>
          </section>

          <section className="popup popup__add-place">
            <form className="popup-container popup-container__place" name="form" method="POST" action="#" noValidate>
              <h2 className="popup-container__text">Новое место</h2>
              <fieldset className="popup-container__info popup-container__info_gray-color">
                <input className="popup-container__infoform popup-container__infoform_place-name" id="place-input" name="name" type="text" placeholder="Название" minLength="1" maxLength="30"  required/>
                <span className = "popup-container__input-error" id="place-input-error">Вы пропустили это поле.</span>
                <input className="popup-container__infoform popup-container__infoform_place-link" id="link-input" name="link" type="url" placeholder="Ссылка на картинку" required/>
                <span className = "popup-container__input-error" id="link-input-error"></span>
                <button className="popup-container__button-add" type="submit">Создать</button>
              </fieldset>
              <button className="popup-container__button-reset popup-container__button-reset_add" type="reset" aria-label="Close"></button>
            </form>
          </section>

          <section className="popup popup__show-image">
            <figure className="popup-image">
              <img className="popup-image__picture" alt="Изображение места"/>
              <figcaption className="popup-image__caption"></figcaption>
              <button className="popup-container__button-reset popup-container__button-reset_image" type="reset" aria-label="Close"></button>
            </figure>
          </section>

          <section className="popup popup__verification">
            <form className="popup-container">
              <fieldset className="popup-container__info">
                <h2 className="popup-container__text">Вы уверены?</h2>
                <button className="popup-container__button-add" type="submit">Да</button>
              </fieldset>
              <button className="popup-container__button-reset popup-container__button-reset_add" type="reset" aria-label="Close"></button>
            </form>
          </section>

          <section className="popup popup__avatar">
            <form className="popup-container popup-container__avatar" name="form" method="POST" action="#" noValidate>
              <h2 className="popup-container__text">Обновить аватар</h2>
              <fieldset className="popup-container__info popup-container__info_gray-color">
                <input className="popup-container__infoform popup-container__infoform_avatar-link" id="avatar-input" name="avatar" type="url" placeholder="Введите ссылку" required/>
                <span className = "popup-container__input-error" id="avatar-input-error"></span>
                <button className="popup-container__button-add" type="submit">Сохранить</button>
              </fieldset>
              <button className="popup-container__button-reset popup-container__button-reset_add" type="reset" aria-label="Close"></button>
            </form>
          </section>
        </main>
    </>
  )
}

export default Main
