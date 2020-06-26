import { baseUrl } from "../utils/constants.js";
import { API } from "./API.js";

//функция создания карточки
export class Card {
  constructor(item, {handleCardClick}, cardSelector) {
    this._likes = item.likes;
    this._name = item.name; //имя картинки
    this._link = item.link; //ссылка на картинку
    this._handleCardClick = handleCardClick; //функция по открытию попапа с картинкой
    this._cardSelector = document.querySelector(cardSelector);
    this._api = new API( {baseUrl} );
  }
  //находим template элемент на странице и клонируем их
  _getTemplate() {
    const cardElement = this._cardSelector
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
    this._element.querySelector('.element__count').textContent = this._likes.length;
    return this._element; //возвращает карточку
  }
  //приватный метод: устанавливает слушатели событий
  _setEventListeners() {
    this._element.querySelector('.element__button').addEventListener('click', (evt) => {
      this._handleLikeButton(); //ставить лайки карточкам
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteCard(); //удалять карточку
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link); //открывает попап с картинкой
    });
  }
  //приватный метод: активный/неактивный лайк
  _handleLikeButton() {
    this._element.querySelector('.element__button').classList.toggle('element__button_like-active');
  }
  //удаляет всю карточку
  _handleDeleteCard() {
    this._element.remove();
  }
}
