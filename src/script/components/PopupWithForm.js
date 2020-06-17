import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup { //наследует класс Popup
  constructor( {handleFormSubmit}, popupSelector ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; //функция принимает объект данных инпутов формы
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup-container__infoform'); //находит все инпуты формы
    this._formValues = {}; //создает пустой объект
    this._inputList.forEach((input) => { //проходит по массиву инпутов
      this._formValues[input.name] = input.value; //передает их пустому объекту (input.name - это имя инпута в html)
    });
    return this._formValues; //возвращает новый объект
  }

  _setEventListeners() {
    super._setEventListeners(); //наследует слик по крестику
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues()); //вызывает метод в index.js

      this.close(); //закрывает попап
    });
  }

  close() {
    super.close();
    this._popupSelector.firstElementChild.reset();
  }
}



