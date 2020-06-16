const content = document.querySelector('.content');

export const editButton = content.querySelector('.profile__button-edit'); //кнопка редактирования

export const popupEditForm = content.querySelector('.popup__edit-form'); //попап-редактировать профиль
export const popupAddPlace = content.querySelector('.popup__add-place'); //попап-добавить новое место
export const popupShowImage = content.querySelector('.popup__show-image'); //попап-открыть картинку

export const addButton = content.querySelector('.profile__button-add'); //кнопка добавть новое место

export const elements = '.elements'; //секция с карточками

export const nameInput = document.forms.form.author; //content.querySelector('.popup-container__infoform_author'); //форма с именем автора
export const jobInput = document.forms.form.job; //content.querySelector('.popup-container__infoform_aboutyourself'); //форма с деятельностью автора

export const initialCards = [        //массив для добавления карточек мест
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

export const formConfig = {
  inputSelector: '.popup-container__infoform', //поле формы
  submitButtonSelector: '.popup-container__button-add', //кнопка добавить/сохранить/создать
  inactiveButtonClass: 'popup-container__button-add_error', //стиль неактивной кнопки
  inputErrorClass: 'popup-container__infoform_type_error', //стиль красного подчеркивания поля
  errorClass: 'popup-container__input-error_active' //появление ошибки валидации
};

export const formAuthor = document.querySelector('.popup-container__author');
export const formPlace = document.querySelector('.popup-container__place');
