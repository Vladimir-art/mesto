//класс должен перезаписывать родительский метод open. В методе open класса
//PopupWithImage нужно вставлять в попап картинку и атрибут src изображения
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    this._popupSelector.querySelector('.popup-image__picture').setAttribute('src', link);
    this._popupSelector.querySelector('.popup-image__caption').textContent = name;
    super.open();
  }
}
