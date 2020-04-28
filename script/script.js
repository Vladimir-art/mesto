const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__button-edit'); //кнопка редактирования
const popupEditForm = content.querySelector('.popup__edit-form'); //попап-редактировать профиль
const popupAddPlace = content.querySelector('.popup__add-place'); //попап-добавить новое место
const popupShowImage = content.querySelector('.popup__show-image'); //попап-открыть картинку
const btnCloseEdit = content.querySelector('.popup-container__button-reset_edit'); // кнопка-закрыть в редакторе профиля
const btnCloseAdd = content.querySelector('.popup-container__button-reset_add');// кнопка-закрыть в добавлении новой карточки
const btnCloseImage = content.querySelector('.popup-container__button-reset_image'); // кнопка-закрыть при увеличении картинки
const formElements = content.querySelectorAll('.popup-container'); //псевдомассив контейнеров внутри попапа
const addButton = content.querySelector('.profile__button-add'); //кнопка добавть новое место
const elements = content.querySelector('.elements'); //секция с карточками
const nameInput = content.querySelector('.popup-container__infoform_author'); //форма с именем автора
const jobInput = content.querySelector('.popup-container__infoform_aboutyourself'); //форма с деятельностью автора
const profileAuthor = content.querySelector('.profile__author'); //имя автора на странице
const profileSpecialty = content.querySelector('.profile__specialty'); //деятельность автора на странице
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

//функция открытия попапа
function openForm(form) {
  form.classList.add('popup_opened');
}

//функция закрытия попапа
function closeForm (form) {
  form.classList.remove('popup_opened');
};

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
  })
  //функция удаления карточек
  placeElement.querySelector('.element__trash').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
  })
  //функция открытия попапа с картинкой
  placeElement.querySelector('.element__image').addEventListener('click', function(evt) {
    openForm(popupShowImage);
    content.querySelector('.popup-image__picture').setAttribute('src', evt.target.src);
    content.querySelector('.popup-image__caption').textContent = name;
  })
  return placeElement;
}

//функция добавления карточек из массива
function addPlaces (arrayPLaces) {
  arrayPLaces.forEach(function(item) {
    elements.append(createCard (item.name, item.link));
   })
}
//функция добавления новых карточек
function formSubmitPlace (evt) {
    evt.preventDefault();
    const placeName = content.querySelector('.popup-container__infoform_place-name'); //находим элементы
    const placeLink = content.querySelector('.popup-container__infoform_place-link'); //формы, в которые будем записывать данные
    elements.prepend(createCard (placeName.value, placeLink.value));
    placeName.value = ''; //обнуляем
    placeLink.value = ''; //значения форм
    closeForm (popupAddPlace); //закрываем форму
}

//при клике открываем форму-редактировать
editButton.addEventListener('click', editForm);
//кнопка-закрыть на попапах
btnCloseEdit.addEventListener('click', () => closeForm(popupEditForm));
btnCloseAdd.addEventListener('click', () => closeForm(popupAddPlace));
btnCloseImage.addEventListener('click', () => closeForm(popupShowImage));
//открытие формы добавления новoго места
addButton.addEventListener('click', function () {
  openForm(popupAddPlace);
});
//сохранения на сайте разных форм
popupEditForm.addEventListener('submit', formSubmitHandler);
popupAddPlace.addEventListener('submit', formSubmitPlace);
//добавление карточек при загрузке страницы
addPlaces(initialCards);
