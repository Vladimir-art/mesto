import React from 'react';
import logo from '../images/mesto-logo.svg';
import Header from './Header';
import Main from './Main';
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
    <>
      <div className="page">
        <Header logo={logo} />
        <Main
          onEditProfile={handleEditProfileClick} //передает ф-цию по клике на редактирование профиля
          onAddPlace={handleAddPlaceClick} // передает ф-цию по клике на кнопку добавления нового места
          onEditAvatar={handleEditAvatarClick} //ф-ция по клику на смену аватара
          onCardClick={handleCardClick} //ф-ция по клике на картинку
          cardInfo={showImage} //получает данные картинки по клику по ней
          isOpen={{ //объект, в котором собраны флаги (true/false) при нажатии всех кнопок
                    editProfilePopup: isEditProfilePopupOpen,
                    addPlacePopup: isAddPlacePopupOpen,
                    editAvatarPopup: isEditAvatarPopupOpen,
                    imagePopup: selectedCard
                  }}
          onClose={closeAllPopups} //ф-ция по закрытию всех форм
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
