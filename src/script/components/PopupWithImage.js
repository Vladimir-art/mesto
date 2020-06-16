//класс должен перезаписывать родительский метод open. В методе open класса
//PopupWithImage нужно вставлять в попап картинку и атрибут src изображения
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor({name, link}, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    this._popupSelector.querySelector('.popup-image__picture').setAttribute('src', this._link);
    this._popupSelector.querySelector('.popup-image__caption').textContent = this._name;
    super.open();
  }
}
