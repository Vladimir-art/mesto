import "./index.css";
import { Api } from "../script/components/Api.js";
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
        popupVerification,
        popupAvatar,
        addButton,
        avatar,
        nameInput,
        jobInput,
        elements,
        formConfig,
        formAuthor,
        formPlace,
        formAvatar,
        baseUrl } from "../script/utils/constants.js";

//создаем класс для вызова API
const api = new Api({baseUrl});

function optimisticUx(selector, text) {
  selector.classList.remove('popup_opened');
  selector.querySelector('.popup-container__button-add').textContent = text;
  selector.firstElementChild.reset();
}

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
  avatar: '.profile__avatar',
  inputAuthor: nameInput,
  inputJob: jobInput
}, api);
form.userInterface(); //заносим данные в шапку страницу из сервера

//функция для внесения данных об аторе после редактирования
const formSubmitHandler = new PopupWithForm({
  handleFormSubmit: (formData, popupSelector, text) => {
    form.setUserInfo(formData, popupSelector, text); //функция вызывет публичный метод класса UserInfo и отправялет новые данные на сервер
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
  const card = new Card(api, item, {// класс Cаrd принимает экземпляр класса Api из глобал скоуп
    handleCardClick: () => { //Обращается к классу по открытию попапа с картинкой и
      popupImage.open(item.name, item.link); //вызывает метод открытия
    },
    handleCardDelete: (element) => { //подтверждение удаления
      const popupClose = new PopupWithForm({ // создает класс с подтверждением удаления карточки
        handleFormSubmit: ({}, popupSelector, text) => {
          api.deleteCard(`/cards/${item._id}`)
            .then(() => {
              element.remove();
              optimisticUx(popupSelector, text);
            })
            .catch((err) => {
              console.log(`Упс, произошла ошибка: ${err}`)
            });//удаляет полученный элемент
        }
      }, popupVerification);
      popupClose.open();//вызывает класс
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

api.getInitialCards('/cards').then((arr) => { //получет массив карточек с сервера и
  cardList.addItem(arr);//добавляет на страницу
})

// добавлениe новых карточек
const formSubmitPlace = new PopupWithForm({
  handleFormSubmit: (formData, popupSelector, text) => {//создаю массив из объекта инпутов
    api.sendPlaceCard('/cards', formData)
      .then((data) => {
        cardList.addItem([data]); //создает карточку
        optimisticUx(popupSelector, text);
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`)
      })
  }
}, popupAddPlace);

//меняем аватар автора
const formSubmitAvatar = new PopupWithForm({
  handleFormSubmit: (data, popupSelector, text) => {
    api.changeAvatar('/users/me/avatar', data)
    .then((data) => {
      document.querySelector('.profile__avatar').setAttribute('src', data.avatar); //находит элемент в ДОМ и меняет ссылку
      optimisticUx(popupSelector, text);
    })
    .catch((err) => {
      console.log(`Упс, произошла ошибка: ${err}`)
    })
  }
}, popupAvatar);

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
popupVerification.addEventListener('click', closePopup);
//открытие формы добавления новoго места
addButton.addEventListener('click', function () {
  formValidatorPlace.clearError(); //сбрасываем состояние кнопки
  formSubmitPlace.open();
});
avatar.addEventListener('click', function () {
  formValidatorAvatar.clearError(); //сбрасываем состояние кнопки
  formSubmitAvatar.open();
});

//------------в а л и д а ц и я -------------
//вызов класса с валидацией для каждой формы
const formValidatorAuthor = new FormValidator(formConfig, formAuthor); //для валидации формы с автором
formValidatorAuthor.enableValidation();

const formValidatorPlace = new FormValidator(formConfig, formPlace);//для валидации формы с местом
formValidatorPlace.enableValidation();

const formValidatorAvatar = new FormValidator(formConfig, formAvatar);//для валидации формы с аватаркой
formValidatorAvatar.enableValidation();
