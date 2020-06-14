const content = document.querySelector('.content');

export const editButton = content.querySelector('.profile__button-edit'); //кнопка редактирования

export const popupEditForm = content.querySelector('.popup__edit-form'); //попап-редактировать профиль
export const popupAddPlace = content.querySelector('.popup__add-place'); //попап-добавить новое место
export const popupShowImage = content.querySelector('.popup__show-image'); //попап-открыть картинку

export const addButton = content.querySelector('.profile__button-add'); //кнопка добавть новое место

export const elements = '.elements'; //секция с карточками

export const nameInput = document.forms.form.author; //content.querySelector('.popup-container__infoform_author'); //форма с именем автора
export const jobInput = document.forms.form.job; //content.querySelector('.popup-container__infoform_aboutyourself'); //форма с деятельностью автора

export const image = content.querySelector('.popup-image__picture'); //картинка карточки
export const caption = content.querySelector('.popup-image__caption'); //подпись под картинкой

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
