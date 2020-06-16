import "./index.css";
import { Section } from "../script/components/Section.js";
import { FormValidator } from "../script/components/FormValidator.js";
import { Card } from "../script/components/Card.js";
import { Popup } from "../script/components/Popup.js";
import { PopupWithImage } from "../script/components/PopupWithImage.js";
import { PopupWithForm } from "../script/components/PopupWithForm.js";
import { UserInfo } from "../script/components/UserInfo.js";
import { editButton,
        popupEditForm,
        popupAddPlace,
        popupShowImage,
        addButton,
        elements,
        initialCards,
        formConfig,
        formAuthor,
        formPlace } from "../script/utils/constants.js";

// создаем карточку открытия/закрытия попапа
const authorForm = new Popup(popupEditForm);
const addPlace = new Popup(popupAddPlace);
const showImage = new Popup(popupShowImage);

//оверлей для попапов для мыши
function closePopup(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened');
  }
}
// создаем класс информации об авторе страницы
const form = new UserInfo({
  nameSelector: '.profile__author',
  jobSelector: '.profile__specialty'
});

//функция для занесения данных в попап-редактировать при открытии
function editForm() {
  formValidatorAuthor.clearError(); //сбрасываем состояние кнопки
  form.getUserInfo();
  authorForm.open();
}

//функция для внесения данных об аторе после редактирования
const formSubmitHandler = new PopupWithForm({
  handleFormSubmit: (formData) => {
    form.setUserInfo();
  }
}, popupEditForm);

formSubmitHandler.open();

// const popupImage = new PopupWithImage({name, link}, popupShowImage); как мне передать создание данного класса в глобальный скоуп,
//если в одном случае ф-ция handlePlace принимает объекты из массива, а во втором значения полей формы.

//функция создания карточки с местом
function handlePlace(item) {
  const card = new Card(item, {
    handleCardClick: (name, link) => { //метод вызывает класс по открытию попапа с картинкой (принимает темплейт картинки)
        const popupImage = new PopupWithImage({name, link}, popupShowImage); //создает класс с картинкой (передает объект с {именем и ссылкой}, домом)
        popupImage.open(); //вызывает метод открытия
    }
  }, '.element__template');
  const cardElement = card.generateCard();
  return cardElement;
}

//функция добавления карточек из массива
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.appendItem(handlePlace(item)); //передает функцию по созданию карточки картинки в конец секции
  }
}, elements);

cardList.addItem(); //добавляет на страницу

//функция добавления новых карточек
const formSubmitPlace = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const cardPlace = new Section({ //создаю еще один класс, поскольку renderer добавляет карточки в начало контейнера
      items: [{
        name: formData.name,
        link: formData.link
      }],
      renderer: (item) => {
        cardPlace.prependItem(handlePlace(item)); //в начало контейнера
      }
    }, elements);

    cardPlace.addItem();
  }
}, popupAddPlace);

formSubmitPlace.open();

//фугкции по закрытию поапов по крестику
authorForm.close();
addPlace.close();
showImage.close();
//при клике открываем форму-редактировать
editButton.addEventListener('click', editForm);
//оверлей попапов
popupEditForm.addEventListener('click', closePopup);
popupAddPlace.addEventListener('click', closePopup);
popupShowImage.addEventListener('click', closePopup);
//открытие формы добавления новoго места
addButton.addEventListener('click', function () {
  formValidatorPlace.clearError(); //сбрасываем состояние кнопки
  addPlace.open();
});
//------------в а л и д а ц и я -------------
//вызов класса с валидацией для каждой формы
const formValidatorAuthor = new FormValidator(formConfig, formAuthor); //для валидации формы с автором
formValidatorAuthor.enableValidation();

const formValidatorPlace = new FormValidator(formConfig, formPlace);//для валидации формы с местом
formValidatorPlace.enableValidation();


