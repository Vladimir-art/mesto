import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Popup } from "./Popup.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const content = document.querySelector('.content');

const editButton = content.querySelector('.profile__button-edit'); //кнопка редактирования

const popupEditForm = content.querySelector('.popup__edit-form'); //попап-редактировать профиль
const popupAddPlace = content.querySelector('.popup__add-place'); //попап-добавить новое место
export const popupShowImage = content.querySelector('.popup__show-image'); //попап-открыть картинку

const btnCloseEdit = content.querySelector('.popup-container__button-reset_edit'); // кнопка-закрыть в редакторе профиля
const btnCloseAdd = content.querySelector('.popup-container__button-reset_add');// кнопка-закрыть в добавлении новой карточки
const btnCloseImage = content.querySelector('.popup-container__button-reset_image'); // кнопка-закрыть при увеличении картинки
const addButton = content.querySelector('.profile__button-add'); //кнопка добавть новое место

const elements = '.elements'; //секция с карточками

export const nameInput = document.forms.form.author; //content.querySelector('.popup-container__infoform_author'); //форма с именем автора
export const jobInput = document.forms.form.job; //content.querySelector('.popup-container__infoform_aboutyourself'); //форма с деятельностью автора
const profileAuthor = content.querySelector('.profile__author'); //имя автора на странице
const profileSpecialty = content.querySelector('.profile__specialty'); //деятельность автора на странице

export const image = content.querySelector('.popup-image__picture'); //картинка карточки
export const caption = content.querySelector('.popup-image__caption'); //подпись под картинкой

const placeName = content.querySelector('.popup-container__infoform_place-name'); //находим элементы
const placeLink = content.querySelector('.popup-container__infoform_place-link'); //формы, в которые будем записывать данные

const initialCards = [        //массив для добавления карточек мест
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://images.unsplash.com/photo-1587542177509-573b5aeb557f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
  const closeForm = new Popup(popupForm);
  return closeForm.close();
}
//функция закрытия попапа
export function openForm(popupForm) {
  const openForm = new Popup(popupForm);
  return openForm.open();
}

//оверлей для попапов для мыши
function closePopup(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened');
  }
}

//функция для занесения данных в попап-редактировать
function editForm() {
  clearError(popupEditForm);
  const form = new UserInfo({
    nameSelector: '.profile__author',
    jobSelector: '.profile__specialty'
  });
  form.getUserInfo();
  openForm(popupEditForm);
}

//функция для внесения данных об аторе
const formSubmitHandler = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const form = new UserInfo({
      nameSelector: '.profile__author',
      jobSelector: '.profile__specialty'
    });
    form.setUserInfo();

    // profileAuthor.textContent = formData.author;
    // profileSpecialty.textContent = formData.job;
  }
}, popupEditForm);

formSubmitHandler.close();

//функция создания карточки с местом
function handlePlace(item) {
  const card = new Card(item);
  const cardElement = card.generateCard();
  return cardElement;
}

//функция добавления карточек из массива
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.appendItem(handlePlace(item));
  }
}, elements);

cardList.addItem();

//функция добавления новых карточек
const formSubmitPlace = new PopupWithForm({
  handleFormSubmit: (formData) => {
    // console.log(formData);
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


