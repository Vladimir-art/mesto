import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor( {handleFormSubmit}, popupSelector ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup-container__infoform');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      this._popupSelector.classList.remove('popup_opened');
    });
  }

  close() {
    super.close();
    this._popupSelector.firstElementChild.reset();
  }
}



