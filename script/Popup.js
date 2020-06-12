//класс попап для окрытия и закрытия

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector; //DOM элемент попапа
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._setEventListeners();
  }
  //закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
    }
  }
  //добавляет слушатель клика иконке закрытия попапа
  _setEventListeners() {
    this._popupSelector.querySelector('.popup-container__button-reset').addEventListener('click', () => {
      this._popupSelector.classList.remove('popup_opened');
    });
  }
}
