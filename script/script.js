import { Card } from "./Card.js";

const content = document.querySelector('.content');

const editButton = content.querySelector('.profile__button-edit'); //кнопка редактирования

const popupEditForm = content.querySelector('.popup__edit-form'); //попап-редактировать профиль
const popupAddPlace = content.querySelector('.popup__add-place'); //попап-добавить новое место
const popupShowImage = content.querySelector('.popup__show-image'); //попап-открыть картинку

const btnCloseEdit = content.querySelector('.popup-container__button-reset_edit'); // кнопка-закрыть в редакторе профиля
const btnCloseAdd = content.querySelector('.popup-container__button-reset_add');// кнопка-закрыть в добавлении новой карточки
const btnCloseImage = content.querySelector('.popup-container__button-reset_image'); // кнопка-закрыть при увеличении картинки
const addButton = content.querySelector('.profile__button-add'); //кнопка добавть новое место

const elements = content.querySelector('.elements'); //секция с карточками

const nameInput = document.forms.form.author; //content.querySelector('.popup-container__infoform_author'); //форма с именем автора
const jobInput = document.forms.form.job; //content.querySelector('.popup-container__infoform_aboutyourself'); //форма с деятельностью автора
const profileAuthor = content.querySelector('.profile__author'); //имя автора на странице
const profileSpecialty = content.querySelector('.profile__specialty'); //деятельность автора на странице

const image = content.querySelector('.popup-image__picture'); //картинка карточки
const caption = content.querySelector('.popup-image__caption'); //подпись под картинкой

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
function clearError (elem) {
  const object = {inactiveButtonClass: 'popup-container__button-add_error'}; //создаем объект со стилем неактивной кнопки
  const errorSpanList = elem.querySelectorAll('.popup-container__input-error'); //находим все спаны
  const errorInputList = Array.from(elem.querySelectorAll('.popup-container__infoform')); //создаем массив из инпутов
  const buttonElement = elem.querySelector('.popup-container__button-add'); //находим кнопку формы
  elem.firstElementChild.reset(); //сбрасываем значения всех инпутов
  // toggleButtonState(object, errorInputList, buttonElement); //проверяем массив инпутов и делаем кнопку активной/неактивной (сбрасываем состояние кнопки)
  const validButton = new FormValidator(object, elem);
  validButton._toggleButtonState(errorInputList, buttonElement);
  errorSpanList.forEach((span) => { //проходим по всем спанам и удаляем активный текст
    span.classList.remove('popup-container__input-error_active');
  });
  errorInputList.forEach((input) => { //проходим по массиву инпутов
    input.classList.remove('popup-container__infoform_type_error'); //удаляем класс подчеркивания ошибки валидации
  });
}

//закрытие попапов при нажатии на Esc
function closeEsc (evt) {
  if (evt.key === 'Escape') {
    content.querySelector('.popup_opened').classList.remove('popup_opened');
  };
}

//функция открытия попапа
function openForm(form) {
  form.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
}

//функция закрытия попапа
function closeForm (form) {
  form.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
}

//оверлей для попапов для мыши
function closePopup (evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened');
  }
}

//функция для занесения данных в попап-редактировать
function editForm () {
  clearError(popupEditForm);
  nameInput.value = profileAuthor.textContent;
  jobInput.value = profileSpecialty.textContent;

  openForm(popupEditForm);
}

//функция для внесения данных об аторе
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileAuthor.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;

    closeForm(popupEditForm);
}

//функция добавления карточек из массива
function addPlaces (arrayPLaces) {
  arrayPLaces.forEach(function(item) {
    const card = new Card(item.name, item.link);
    const cardElement = card.generateCard();
    elements.append(cardElement);
   });
}
//функция добавления новых карточек
function formSubmitPlace (evt) {
    evt.preventDefault();
    const card = new Card(placeName.value, placeLink.value);
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
    closeForm (popupAddPlace); //закрываем форму
}

//функция закрытия попапа на крестик (находит родительский элемент и закрывает попап)
function findButtonClose (evt) {
  closeForm(evt.target.closest('.popup_opened'));
}

//при клике открываем форму-редактировать
editButton.addEventListener('click', editForm);
//кнопка-закрыть на попапах
btnCloseEdit.addEventListener('click', findButtonClose);
btnCloseAdd.addEventListener('click', findButtonClose);
btnCloseImage.addEventListener('click', findButtonClose);
//оверлей попапов
popupEditForm.addEventListener('click', closePopup);
popupAddPlace.addEventListener('click', closePopup);
popupShowImage.addEventListener('click', closePopup);
//открытие формы добавления новoго места
addButton.addEventListener('click', function () {
  clearError(popupAddPlace);
  openForm(popupAddPlace);
});

popupEditForm.addEventListener('submit', formSubmitHandler); //отправка формы редактирования автора
popupAddPlace.addEventListener('submit', formSubmitPlace); // отправка на сраницу формы добавления новой карточки

addPlaces(initialCards);//добавление карточек из массива при загрузке страницы

