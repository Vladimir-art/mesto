const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__button-edit'); //кнопка редактирования
const resetButtons = content.querySelectorAll('.popup-container__button-reset'); // выбираем все кнопки закрыть
const popup = content.querySelectorAll('.popup'); //выбираем все попапы в секциях
const arrayPopup = Array.from(popup); //создаем массив попапов
const formElement = content.querySelectorAll('.popup-container'); //псевдомассив контейнеров внутри попапа
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

function addPlace (arrayPlaces) {  //фнкция добавления карточек на страницу
  const placeTemplate = document.querySelector('.element__template').content;  //находим template в HTML
  //проходим по каждому элементу массива
  arrayPlaces.forEach(function(element, position) {
    const placeElement = placeTemplate.cloneNode(true);  //при каждой итерации клонируем все дочерние элементы template
    placeElement.querySelector('.element__image').setAttribute('src', `${arrayPlaces[position].link}`); //добавляем ссылку для изображения
    placeElement.querySelector('.element__place').textContent = arrayPlaces[position].name; //добавляем текст

    elements.append(placeElement); //добавляем карточки на страницу для секции elements
   })
}

//функция добавления новых карточек на страницу
function formSubmitPlace (evt) {
  evt.preventDefault();

  let placeName = content.querySelector('.popup-container__infoform_place-name'); //находим элементы
  let placeLink = content.querySelector('.popup-container__infoform_place-link'); //формы, в которые будем записывать данные
  const placeTemplate = document.querySelector('.element__template').content; //находим template в HTML
  const placeElement = placeTemplate.cloneNode(true); //клонируем все дочерние элементы template
  placeElement.querySelector('.element__image').setAttribute('src', `${placeLink.value}`); //добавляем ссылку для изображения
  placeElement.querySelector('.element__place').textContent = placeName.value; //добавляем текст

  elements.prepend(placeElement); //добавляем карточку в начало секции
  placeName.value = ''; //обнуляем
  placeLink.value = ''; //значения форм
  resetForm (); //закрываем форму
}

function resetForm () {  //функция закрытия попапа
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
formElement.forEach(function() {
  formElement[0].addEventListener('submit', formSubmitHandler); //сохранить имя и деятельность автора
  formElement[1].addEventListener('submit', formSubmitPlace); //сохранить новые карточки
});
//добвление стандартных карточек при открытии страницы
addPlace(initialCards);
