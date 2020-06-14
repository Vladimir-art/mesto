import "../src/pages/index.css";
import { Section } from "./components/Section.js";
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Popup } from "./components/Popup.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { editButton,
        popupEditForm,
        popupAddPlace,
        popupShowImage,
        addButton,
        elements,
        initialCards } from "./utils/constants.js";

//функция удаления текста ошибки валидации (принимает одну форму)
function clearError(elem) {
  const object = { inactiveButtonClass: 'popup-container__button-add_error' }; //создаем объект со стилем неактивной кнопки
  const errorSpanList = elem.querySelectorAll('.popup-container__input-error'); //находим все спаны
  const errorInputList = Array.from(elem.querySelectorAll('.popup-container__infoform')); //создаем массив из инпутов
  const buttonElement = elem.querySelector('.popup-container__button-add'); //находим кнопку формы
  elem.firstElementChild.reset(); //сбрасываем значения всех инпутов
  //проверяем массив инпутов и делаем кнопку активной/неактивной (сбрасываем состояние кнопки)
  const validButton = new FormValidator(object, elem);
  validButton._toggleButtonState(errorInputList, buttonElement);
  errorSpanList.forEach((span) => { //проходим по всем спанам и удаляем активный текст
    span.classList.remove('popup-container__input-error_active');
  });
  errorInputList.forEach((input) => { //проходим по массиву инпутов
    input.classList.remove('popup-container__infoform_type_error'); //удаляем класс подчеркивания ошибки валидации
  });
}
//функция открытия попапа
function closeForm(popupForm) {
  const closeForm = new Popup(popupForm); //создаем класс Popup
  return closeForm.close(); //вызываем метод закрытия попапа
}
//функция закрытия попапа
export function openForm(popupForm) {
  const openForm = new Popup(popupForm);
  return openForm.open(); //вызываем метод открытия
}

//оверлей для попапов для мыши
function closePopup(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened');
  }
}

//функция для занесения данных в попап-редактировать при открытии
function editForm() {
  clearError(popupEditForm);
  const form = new UserInfo({
    nameSelector: '.profile__author',
    jobSelector: '.profile__specialty'
  });
  form.getUserInfo();
  openForm(popupEditForm);
}

//функция для внесения данных об аторе после редактирования
const formSubmitHandler = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const form = new UserInfo({
      nameSelector: '.profile__author',
      jobSelector: '.profile__specialty'
    });
    form.setUserInfo();
  }
}, popupEditForm);

formSubmitHandler.close();

//функция создания карточки с местом
function handlePlace(item) {
  const card = new Card(item, {
    handleCardClick: (form) => { //метод вызывает класс по открытию попапа с картинкой (принимает темплейт картинки)
      form.querySelector('.element__image').addEventListener('click', ()=> { //находит картинку и при клике вызывает класс
        const popupImage = new PopupWithImage(item, popupShowImage); //создает класс с картинкой (передает объект с {именем и ссылкой}, домом)
        popupImage.open(); //вызывает метод открытия
      })
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

//функция добавления карточек из массива
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.appendItem(handlePlace(item)); //передает функцию по созданию карточки картинки
  }
}, elements);

cardList.addItem(); //добавляет на страницу

//функция добавления новых карточек
const formSubmitPlace = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const cardPlace = new Section({
      items: [{
        name: formData.name,
        link: formData.link
      }],
      renderer: (item) => {
        cardPlace.prependItem(handlePlace(item));
      }
    }, elements);

    cardPlace.addItem();
  }
}, popupAddPlace);
formSubmitPlace.close();

//фугкции по закрытию поапов по крестику
closeForm(popupEditForm);
closeForm(popupAddPlace);
closeForm(popupShowImage);
//при клике открываем форму-редактировать
editButton.addEventListener('click', editForm);
//оверлей попапов
popupEditForm.addEventListener('click', closePopup);
popupAddPlace.addEventListener('click', closePopup);
popupShowImage.addEventListener('click', closePopup);
//открытие формы добавления новoго места
addButton.addEventListener('click', function () {
  clearError(popupAddPlace);
  openForm(popupAddPlace);
});
//------------в а л и д а ц и я -------------
//создаем каждую форму отдельно
const formAuthor = document.querySelector('.popup-container__author');
const formPlace = document.querySelector('.popup-container__place');
//создаем объект с селекторами и классами форм
const formConfig = {
  inputSelector: '.popup-container__infoform', //поле формы
  submitButtonSelector: '.popup-container__button-add', //кнопка добавить/сохранить/создать
  inactiveButtonClass: 'popup-container__button-add_error', //стиль неактивной кнопки
  inputErrorClass: 'popup-container__infoform_type_error', //стиль красного подчеркивания поля
  errorClass: 'popup-container__input-error_active' //появление ошибки валидации
}
//вызов класса с валидацией для каждой формы
const formValidatorAuthor = new FormValidator(formConfig, formAuthor); //для валидации формы с автором
formValidatorAuthor.enableValidation();

const formValidatorPlace = new FormValidator(formConfig, formPlace);//для валидации формы с местом
formValidatorPlace.enableValidation();


