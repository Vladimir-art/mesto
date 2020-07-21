//класс попап для окрытия и закрытия

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector; //DOM элемента попапа
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this._setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  //закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      document.querySelector('.popup_opened').classList.remove('popup_opened'); //обработчик вешается на весь документ
    }
  }
  //добавляет слушатель клика иконке закрытия попапа
  _setEventListeners() {
    this._popupSelector.querySelector('.popup-container__button-reset').addEventListener('click', () => {
      this.close();
    });
  }
}
