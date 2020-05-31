 export class FormValidator {
  constructor (object, form) {
    this._form = form;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
  }

  _showInputError(inputElement, errorMessage) {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`); //находим место где появляется ошибка из DOM по его id
      inputElement.classList.add('popup-container__infoform_type_error'); //добавляем полям формы стиль с красным подчеркиванием
      errorElement.textContent = errorMessage; //передаем текст ошибки валидации
      errorElement.classList.add(this._errorClass); //подключаем стиль появления текста ошибки
    };

    //функция скрытия текста ошибки и красной линии полей форм (также как и в функции showInputError)
  _hideInputError(inputElement) {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove('popup-container__infoform_type_error');
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    };

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid; //если поле невалидно - возвращаем true
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) { //если хоть одно поле невалидно
      buttonElement.classList.add(this._inactiveButtonClass); //добавляем кнопке класс со стилем неактивной кнопки (серой)
      buttonElement.setAttribute('disabled', true);
    } else {
        // иначе сделай кнопку активной
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  enableValidation() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', ()=> { //проверяем каждый символ, введенный в поле
        this._isValid(inputElement); //проверяем на валидность и показываем ошибки
        this._toggleButtonState(inputList, buttonElement); //делаем кнопку активной или неактивной
      });
    });
  }
};
