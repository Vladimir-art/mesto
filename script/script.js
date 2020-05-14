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
//функция удаления текста ошибки валидации
function clearError (elem) {
  const errorSpanList = elem.querySelectorAll('.popup-container__input-error');
  const errorInputList = elem.querySelectorAll('.popup-container__infoform');
  elem.firstElementChild.reset();
  errorSpanList.forEach((span) => {
    span.classList.remove('popup-container__input-error_active');
  });
  errorInputList.forEach((input) => {
    input.classList.remove('popup-container__infoform_type_error');
  });
};

//функция открытия попапа
function openForm(form) {
  if (!form.classList.contains('popup__show-image')) {
    clearError(form);
  }
  form.classList.add('popup_opened');
}

//функция закрытия попапа
function closeForm (form) {
  form.classList.remove('popup_opened');
};

//оверлей для попапов для мыши
function closePopup (evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened');
  };

}

//функция для занесения данных в попап-редактировать
function editForm () {
  openForm(popupEditForm);

  nameInput.value = profileAuthor.textContent;
  jobInput.value = profileSpecialty.textContent;
}
//функция для внесения данных об аторе
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileAuthor.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;

    closeForm(popupEditForm);
}

//функция создания карточки
function createCard (name, link) {
  const placeTemplate = document.querySelector('.element__template').content;
  const placeElement = placeTemplate.cloneNode(true);
  placeElement.querySelector('.element__image').setAttribute('src', link); //добавляем ссылку для изображения
  placeElement.querySelector('.element__place').textContent = name; //добавляем текст
  //функция чтоб ставить лайки карточкам
  placeElement.querySelector('.element__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button_like-active');
  });
  //функция удаления карточек
  placeElement.querySelector('.element__trash').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  });
  //функция открытия попапа с картинкой
  placeElement.querySelector('.element__image').addEventListener('click', function(evt) {
    image.setAttribute('src', evt.target.src);
    caption.textContent = name;
    openForm(popupShowImage);
  });
  return placeElement;
}

//функция добавления карточек из массива
function addPlaces (arrayPLaces) {
  arrayPLaces.forEach(function(item) {
    elements.append(createCard (item.name, item.link));
   });
}
//функция добавления новых карточек
function formSubmitPlace (evt) {
    evt.preventDefault();
    elements.prepend(createCard (placeName.value, placeLink.value));
    placeName.value = ''; //обнуляем
    placeLink.value = ''; //значения форм
    closeForm (popupAddPlace); //закрываем форму
}

// function setSubmitListeners (evt) {
//   // console.log(evt.target.parentElement.parentElement.parentElement);
//   if (evt.target.closest('.popup__edit-form')) {
//     popupEditForm.addEventListener('submit', formSubmitHandler);
//   } else if (evt.target.closest('.popup__add-place')) {
//     popupAddPlace.addEventListener('submit', formSubmitPlace);
//   };
// }

// function removeSubmitListeners (evt) {
//   if (evt.target.closest('.popup__edit-form')) {
//     popupEditForm.removeEventListener('submit', formSubmitHandler);
//   } else if (evt.target.closest('.popup__add-place')) {
//     popupAddPlace.removeEventListener('submit', formSubmitPlace);
//   };
// }

//при клике открываем форму-редактировать
editButton.addEventListener('click', editForm);
//кнопка-закрыть на попапах
btnCloseEdit.addEventListener('click', () => closeForm(popupEditForm));
btnCloseAdd.addEventListener('click', () => closeForm(popupAddPlace));
btnCloseImage.addEventListener('click', () => closeForm(popupShowImage));
//оверлей попапов
popupEditForm.addEventListener('click', closePopup);
popupAddPlace.addEventListener('click', closePopup);
popupShowImage.addEventListener('click', closePopup);
//закрытие попапов при нажатии на Esc
document.body.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
});
//открытие формы добавления новoго места
addButton.addEventListener('click', function () {
  openForm(popupAddPlace);
});

addPlaces(initialCards);



