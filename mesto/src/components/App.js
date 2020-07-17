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
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cardInfo={showImage}
          isOpen={{
                    editProfilePopup: isEditProfilePopupOpen,
                    addPlacePopup: isAddPlacePopupOpen,
                    editAvatarPopup: isEditAvatarPopupOpen,
                    imagePopup: selectedCard
                  }}
          onClose={closeAllPopups}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
