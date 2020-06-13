//класс должен перезаписывать родительский метод open. В методе open класса
//PopupWithImage нужно вставлять в попап картинку и атрибут src изображения
import { Popup } from './Popup.js';
import { image, caption } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor({name, link}, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
  }

  open() {
    image.setAttribute('src', this._link);
    caption.textContent = this._name;
    super.open();
  }

}
