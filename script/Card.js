import { image, caption, popupShowImage, openForm } from "./index.js";

//функция создания карточки
export class Card {
  constructor(item, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
  }
  //находим template элемент на странице и клонируем их
  _getTemplate() {
    const cardElement = document.querySelector('.element__template')
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }
  //публичный метод: возвращает карточку со всей функциональностью
  generateCard() {
    this._element = this._getTemplate(); //присваивает template элементы
    this._setEventListeners(); //добавляет карточке слушатели событий
    this._element.querySelector('.element__place').textContent = this._name; //присваивает значения
    this._element.querySelector('.element__image').setAttribute('src', this._link);
    return this._element; //возвращает карточку
  }
  //приватный метод: устанавливает слушатели событий
  _setEventListeners() {
    this._element.querySelector('.element__button').addEventListener('click', () => {
      this._handleLikeButton(); //ставить лайки карточкам
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteCard(); //удалять карточку
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleShowImage(); //открывать попап с картинкой
    })
  }
  //приватный метод: активный/неактивный лайк
  _handleLikeButton() {
    this._element.querySelector('.element__button').classList.toggle('element__button_like-active');
  }
  //удаляет всю карточку
  _handleDeleteCard() {
    this._element.remove();
  }
  //открывает попап с картинкой
  _handleShowImage() {
    image.setAttribute('src', this._link);
    caption.textContent = this._name;
    openForm(popupShowImage);
  }
}
