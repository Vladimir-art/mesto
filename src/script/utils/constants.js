const content = document.querySelector('.content');
export const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-12'; //базовый URL

export const editButton = content.querySelector('.profile__button-edit'); //кнопка редактирования

export const popupEditForm = content.querySelector('.popup__edit-form'); //попап-редактировать профиль
export const popupAddPlace = content.querySelector('.popup__add-place'); //попап-добавить новое место
export const popupShowImage = content.querySelector('.popup__show-image'); //попап-открыть картинку
export const popupVerification = content.querySelector('.popup__verification'); //попап подтвердить удаление
export const popupAvatar = content.querySelector('.popup__avatar'); //попап подтвердить удаление

export const addButton = content.querySelector('.profile__button-add'); //кнопка добавть новое место
export const avatar = content.querySelector('.profile__information');

export const elements = '.elements'; //секция с карточками

export const nameInput = document.forms.form.author; //content.querySelector('.popup-container__infoform_author'); //форма с именем автора
export const jobInput = document.forms.form.job; //content.querySelector('.popup-container__infoform_aboutyourself'); //форма с деятельностью автора

export const formConfig = {
  inputSelector: '.popup-container__infoform', //поле формы
  submitButtonSelector: '.popup-container__button-add', //кнопка добавить/сохранить/создать
  inactiveButtonClass: 'popup-container__button-add_error', //стиль неактивной кнопки
  inputErrorClass: 'popup-container__infoform_type_error', //стиль красного подчеркивания поля
  errorClass: 'popup-container__input-error_active' //появление ошибки валидации
};

export const formAuthor = document.querySelector('.popup-container__author');
export const formPlace = document.querySelector('.popup-container__place');
export const formAvatar = document.querySelector('.popup-container__avatar');
