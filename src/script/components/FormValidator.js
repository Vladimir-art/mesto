export class FormValidator {
  constructor(object, form) {
    this._form = form;
    this._inputSelector = object.inputSelector; //поле формы
    this._submitButtonSelector = object.submitButtonSelector; //кнопка добавить/сохранить/создать
    this._inactiveButtonClass = object.inactiveButtonClass; //стиль неактивной кнопки
    this._inputErrorClass = object.inputErrorClass; //стиль красного подчеркивания поля
    this._errorClass = object.errorClass; //появление ошибки валидации
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`); //находим место где появляется ошибка из DOM по его id
    inputElement.classList.add(this._inputErrorClass); //добавляем полям формы стиль с красным подчеркиванием
    errorElement.textContent = errorMessage; //передаем текст ошибки валидации
    errorElement.classList.add(this._errorClass); //подключаем стиль появления текста ошибки
  };

  //функция скрытия текста ошибки и красной линии полей форм (также как и в функции showInputError)
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
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
      inputElement.addEventListener('input', () => { //проверяем каждый символ, введенный в поле
        this._isValid(inputElement); //проверяем на валидность и показываем ошибки
        this._toggleButtonState(inputList, buttonElement); //делаем кнопку активной или неактивной
      });
    });
  }
  //сбрасываем состояние кнопки
  clearError() {
    const errorSpanList = this._form.querySelectorAll('.popup-container__input-error'); //находим все спаны
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); //создаем массив из инпутов
    const buttonElement = this._form.querySelector(this._submitButtonSelector); //находим кнопку формы
    this._form.reset(); //сбрасываем значения всех инпутов
    //проверяем массив инпутов и делаем кнопку активной/неактивной (сбрасываем состояние кнопки)
    this._toggleButtonState(inputList, buttonElement);
    errorSpanList.forEach((span) => { //проходим по всем спанам и удаляем активный текст
      span.classList.remove('popup-container__input-error_active');
    });
    inputList.forEach((input) => { //проходим по массиву инпутов
      input.classList.remove(this._inputErrorClass); //удаляем класс подчеркивания ошибки валидации
    });
  }
}
