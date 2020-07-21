import React from 'react';
import logo from '../images/mesto-logo.svg';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [showImage, setShowImage] = React.useState({});
  //функция меняет хначения при клике на картинку и передает showImage данные об этой картинке (получает из компонента ImagePopup)
  function handleCardClick(data) {
    setSelectedCard(true);
    setShowImage(data);
  }
  //попап сменить аватарку
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  //попап редактировать профиль
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  //попап загрузить новое место
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  //закрывает все попапы на крестик
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  return (
      <div className="page">
        <Header logo={logo} />
        <Main
          onEditProfile={handleEditProfileClick} //передает ф-цию по клике на редактирование профиля
          onAddPlace={handleAddPlaceClick} // передает ф-цию по клике на кнопку добавления нового места
          onEditAvatar={handleEditAvatarClick} //ф-ция по клику на смену аватара
          onCardClick={handleCardClick} //ф-ция по клике на картинку
        />
        {/*в каждом компоненте PopupWithForm передаем пропс isOpen, который есть условие того что конкретное поле объекта true и если оно верно, передаем новый класс по открытию формы*/}
        <PopupWithForm title="Редактировать профиль" name="edit-form" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} children={
            <>
              <input className="popup-container__infoform popup-container__infoform_author" id="author-input" name="author" defaultValue="имя" type="text"  placeholder="Автор" minLength="2" maxLength="40" pattern="[A-Za-zА-ЯЁа-яё -]{1,}" required/>
              <span className = "popup-container__input-error" id="author-input-error">Вы пропустили это поле.</span>
              <input className="popup-container__infoform popup-container__infoform_aboutyourself" id="job-input" name="job" defaultValue="деятельность" type="text"  placeholder="О себе"  minLength="2" maxLength="200" required/>
              <span className = "popup-container__input-error" id="job-input-error">Вы пропустили это поле.</span>
            </>
          } />
        <PopupWithForm title="Новое место" name="add-place" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} children={
            <>
              <input className="popup-container__infoform popup-container__infoform_place-name" id="place-input" name="name" type="text" placeholder="Название" minLength="1" maxLength="30"  required/>
              <span className = "popup-container__input-error" id="place-input-error">Вы пропустили это поле.</span>
              <input className="popup-container__infoform popup-container__infoform_place-link" id="link-input" name="link" type="url" placeholder="Ссылка на картинку" required/>
              <span className = "popup-container__input-error" id="link-input-error"></span>
            </>
          } />
        <PopupWithForm title="Обновить аватар" name="avatar" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} children={
            <>
              <input className="popup-container__infoform popup-container__infoform_avatar-link" id="avatar-input" name="avatar" type="url" placeholder="Введите ссылку" required/>
              <span className = "popup-container__input-error" id="avatar-input-error"></span>
            </>
          } />
        <PopupWithForm title="Вы уверены?" name="verification" buttonText="Да" />
          {/*в ImagePopup передаем объект о нажатой карточке (card), условие как в PopupWithForm и ф-цию по смене стейта по нажатию на крестик*/}
        <ImagePopup card={showImage} isOpen={selectedCard} onClose={closeAllPopups}/>
        <Footer />
      </div>
  );
}

export default App;
