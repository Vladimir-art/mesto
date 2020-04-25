const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__button-edit'); //кнопка редактирования
const resetButtons = content.querySelectorAll('.popup-container__button-reset'); // выбираем все кнопки закрыть
const popup = content.querySelectorAll('.popup'); //выбираем все попапы в секциях
const arrayPopup = Array.from(popup); //создаем массив попапов
const formElements = content.querySelectorAll('.popup-container'); //псевдомассив контейнеров внутри попапа
const addButton = content.querySelector('.profile__button-add'); //кнопка добавть новое место
const elements = content.querySelector('.elements');
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

function editForm () {  //функция для открытия попапа-редактировать
  arrayPopup[0].classList.add('popup_opened');
  // выбираем поля формы
  let nameInput = content.querySelector('.popup-container__infoform_author');
  let jobInput = content.querySelector('.popup-container__infoform_aboutyourself');
  let profileAuthor = content.querySelector('.profile__author');
  let profileSpecialty = content.querySelector('.profile__specialty');
  // присваиваем им значения
  nameInput.value = profileAuthor.textContent;
  jobInput.value = profileSpecialty.textContent;
}
//функция для внесения данных об аторе
function formSubmitHandler (evt) {
    evt.preventDefault();
    // выбираем поля формы
    let nameInput = content.querySelector('.popup-container__infoform_author');
    let jobInput = content.querySelector('.popup-container__infoform_aboutyourself');
    let profileAuthor = content.querySelector('.profile__author');
    let profileSpecialty = content.querySelector('.profile__specialty');
    // присваиваем им новые значения
    profileAuthor.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;

    resetForm();
}
//фнкция добавления карточек на страницу и манипуляций с ними
function addPlace (arrayPlaces) {
  const placeTemplate = document.querySelector('.element__template').content;  //находим template в HTML
  //проходим по каждому элементу массива
  arrayPlaces.forEach(function(element, position) {
    const placeElement = placeTemplate.cloneNode(true);  //при каждой итерации клонируем все дочерние элементы template
    placeElement.querySelector('.element__image').setAttribute('src', `${arrayPlaces[position].link}`); //добавляем ссылку для изображения
    placeElement.querySelector('.element__place').textContent = arrayPlaces[position].name; //добавляем текст
    //функция чтоб ставить лайки карточкам
    placeElement.querySelector('.element__button').addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__button_like-active');
    })
    //функция удаления карточек
    placeElement.querySelector('.element__trash').addEventListener('click', function(evt) {
      evt.target.parentElement.classList.add('element_delete');
    })
    //функция открытия попапа с картинкой
    placeElement.querySelector('.element__image').addEventListener('click', function(evt) {
      arrayPopup[2].classList.add('popup_opened');
      content.querySelector('.popup-image__picture').setAttribute('src', evt.target.src);
      content.querySelector('.popup-image__caption').textContent = arrayPlaces[position].name;
    })
    elements.append(placeElement); //добавляем карточки на страницу для секции elements
   })
}

//функция добавления новых карточек на страницу и манипуляций с ними
function formSubmitPlace (evt) {
  evt.preventDefault();

  const placeName = content.querySelector('.popup-container__infoform_place-name'); //находим элементы
  const placeLink = content.querySelector('.popup-container__infoform_place-link'); //формы, в которые будем записывать данные
  const placeTemplate = document.querySelector('.element__template').content; //находим template в HTML
  const placeElement = placeTemplate.cloneNode(true); //клонируем все дочерние элементы template
  const elementPlace = placeElement.querySelector('.element__place');
  elementPlace.textContent = placeName.value; //добавляем текст
  placeElement.querySelector('.element__image').setAttribute('src', `${placeLink.value}`); //добавляем ссылку для изображения
  //функция чтоб ставить лайки карточкам
  placeElement.querySelector('.element__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button_like-active');
  })
  //функция удаления карточек
  placeElement.querySelector('.element__trash').addEventListener('click', function(evt) {
    evt.target.parentElement.classList.add('element_delete');
  })
  //функция открытия попапа с картинкой
  placeElement.querySelector('.element__image').addEventListener('click', function(evt) {
    arrayPopup[2].classList.add('popup_opened');
    content.querySelector('.popup-image__picture').setAttribute('src', evt.target.src);
    content.querySelector('.popup-image__caption').textContent = elementPlace.textContent;
    console.log(placeName.value);
  })
  elements.prepend(placeElement); //добавляем карточку в начало секции
  placeName.value = ''; //обнуляем
  placeLink.value = ''; //значения форм
  resetForm (); //закрываем форму
}

//функция закрытия попапа
function resetForm () {
    //проходим по каждому элементу с классом .popup
  arrayPopup.forEach(function(elem, i) {
    if (arrayPopup[i].classList.contains('popup_opened')) {
      arrayPopup[i].classList.remove('popup_opened');
    }
  })
};

//при клике открываем форму-редактировать
editButton.addEventListener('click', editForm);
//кнопка-закрыть на всех попапах
resetButtons.forEach(function(elem, i) {
  resetButtons[i].addEventListener('click', resetForm);
});
//открыть форму добавления новой карточки
addButton.addEventListener('click', function (){
  arrayPopup[1].classList.add('popup_opened');
});
//сохранения на сайте разных форм
formElements.forEach(function(elem, item) {
  switch (item) {
    case 0:
      formElements[item].addEventListener('submit', formSubmitHandler); //сохранить имя и деятельность автора
      break;
    case 1:
      formElements[item].addEventListener('submit', formSubmitPlace); //сохранить новые карточки
      break;
    };
});
//добавление карточек при загрузке страницы
addPlace(initialCards);
