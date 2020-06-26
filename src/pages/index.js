import "./index.css";
import { API } from "../script/components/API.js";
import { Section } from "../script/components/Section.js";
import { FormValidator } from "../script/components/FormValidator.js";
import { Card } from "../script/components/Card.js";
import { PopupWithImage } from "../script/components/PopupWithImage.js";
import { PopupWithForm } from "../script/components/PopupWithForm.js";
import { UserInfo } from "../script/components/UserInfo.js";
import { editButton,
        popupEditForm,
        popupAddPlace,
        popupShowImage,
        addButton,
        elements,
        formConfig,
        formAuthor,
        formPlace,
        baseUrl } from "../script/utils/constants.js";

//------------с е р в е р -------------
const api = new API({baseUrl});

//оверлей для попапов для мыши
function closePopup(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened');
  }
}
// создаем класс информации об авторе страницы
const form = new UserInfo({
  nameSelector: '.profile__author',
  jobSelector: '.profile__specialty',
  avatar: '.profile__avatar'
});
form.userInterface();

//функция для внесения данных об аторе после редактирования
const formSubmitHandler = new PopupWithForm({
  handleFormSubmit: (formData) => {
    form.setUserInfo(formData);
  }
}, popupEditForm);


//функция для занесения данных в попап-редактировать при открытии
function editForm() {
  formValidatorAuthor.clearError();//сбрасываем состояние кнопки
  form.getUserInfo();
  formSubmitHandler.open();
}

const popupImage = new PopupWithImage(popupShowImage); //класс с картинкой

//функция создания карточки с местом
function handlePlace(item) {
  const card = new Card(item, {
    handleCardClick: () => { //Обращается к классу по открытию попапа с картинкой и
        popupImage.open(item.name, item.link); //вызывает метод открытия
    }
  }, '.element__template');
  const cardElement = card.generateCard();
  return cardElement;
}

//функция добавления карточек из массива
const cardList = new Section({
  renderer: (item) => {
    cardList.prependItem(handlePlace(item)); //передает функцию по созданию карточки картинки в конец секции
  }
}, elements);

api.getInitialCards('/cards').then((arr) => {
  cardList.addItem(arr);//добавляет на страницу
})

//функция добавления новых карточек
const formSubmitPlace = new PopupWithForm({
  handleFormSubmit: (formData) => {
    const arrayImage = [formData]; //создаю массив из объекта инпутов
    cardList.addItem(arrayImage);
    api.sendPlaceCard('/cards', formData);
  }
}, popupAddPlace);

// formSubmitPlace.open();

//фугкции по закрытию поапов по крестику
formSubmitHandler.close();
formSubmitPlace.close();
popupImage.close();
//при клике открываем форму-редактировать
editButton.addEventListener('click', editForm);
//оверлей попапов
popupEditForm.addEventListener('click', closePopup);
popupAddPlace.addEventListener('click', closePopup);
popupShowImage.addEventListener('click', closePopup);
//открытие формы добавления новoго места
addButton.addEventListener('click', function () {
  formValidatorPlace.clearError(); //сбрасываем состояние кнопки
  formSubmitPlace.open();
});
//------------в а л и д а ц и я -------------
//вызов класса с валидацией для каждой формы
const formValidatorAuthor = new FormValidator(formConfig, formAuthor); //для валидации формы с автором
formValidatorAuthor.enableValidation();

const formValidatorPlace = new FormValidator(formConfig, formPlace);//для валидации формы с местом
formValidatorPlace.enableValidation();
