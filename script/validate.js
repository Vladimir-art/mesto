
// // функция показывает тест с ошибкой введения данных (принимает объект, форму, поля формы и тест ошибки)
// const showInputError = (object, formElement, element, errorMessage) => {
//   const errorElement = formElement.querySelector(`#${element.id}-error`); //находим место где появляется ошибка из DOM по его id
//   element.classList.add('popup-container__infoform_type_error'); //добавляем полям формы стиль с красным подчеркиванием
//   errorElement.textContent = errorMessage; //передаем текст ошибки валидации
//   errorElement.classList.add(object.errorClass); //подключаем стиль появления текста ошибки
// };

// //функция скрытия текста ошибки и красной линии полей форм (также как и в функции showInputError)
// const hideInputError = (object, formElement, element) => {
//   const errorElement = formElement.querySelector(`#${element.id}-error`);
//   element.classList.remove('popup-container__infoform_type_error');
//   errorElement.classList.remove(object.errorClass);
//   errorElement.textContent = '';
// };

// //функция проверки на валидность всей формы (принимает объект, саму форму и её поле)
// const isValid = (object, formElement, formInput) => {
//   if (!formInput.validity.valid) {
//     // Если поле не проходит валидацию, покажем ошибку
//     showInputError(object, formElement, formInput, formInput.validationMessage);
//   } else {
//     // Если проходит, скроем
//     hideInputError(object, formElement, formInput);
//   }
// };

// //функция создания массива полей формы и их проверки на валидность (принимает объект и форму)
// const setEventListeners = (object, formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(object.inputSelector)); //создаем массив полей формы
//   const buttonElement = formElement.querySelector(object.submitButtonSelector); //находим в DOM кнопку добавления из формы
//   toggleButtonState(object, inputList, buttonElement); //поверяем валидность полей формы и делаем кнопку неактивной
//   //проходим по каждому полю
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', ()=> { //проверяем каждый символ, введенный в поле
//       isValid(object, formElement, inputElement); //проверяем на валидность и показываем ошибки
//       toggleButtonState(object, inputList, buttonElement); //делаем кнопку активной или неактивной
//     });
//   });
// };

// //функция проверки каждого поля на валидность (принимает массив полей формы)
// const hasInvalidInput = (inputList) => {
//   //методом some проверяем поля (до первого невалидного поля)
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid; //если поле невалидно - возвращаем true
//   });
// };

// //функция активной/неактивной кнопки (принимает объект, массив полей и кнопку соответвующей формы)
// const toggleButtonState = (object, inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) { //если хоть одно поле невалидно
//     buttonElement.classList.add(object.inactiveButtonClass); //добавляем кнопке класс со стилем неактивной кнопки (серой)
//     buttonElement.setAttribute('disabled', true);
//   } else {
//         // иначе сделай кнопку активной
//     buttonElement.classList.remove(object.inactiveButtonClass);
//     buttonElement.removeAttribute('disabled');
//   }
// };

// //функция, с которой все начинется - функция создания массива форм страницы
// const enableValidation = (object) => {
//   const formList = Array.from(document.querySelectorAll(object.formElement)); //создает массив из всех форм
//   //проходит по каждой форме
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault(); //отменяет стандарное поведение браузера при отправке формы на страницу
//     });
//     setEventListeners(object, formElement); //вызывает функцию по проверке полей каждой формы на валидность
//   });
// };
// //вызываем функцию, передаем ей объект с полями форм, которые надо проверить
// enableValidation({
//   formElement: '.popup-container', //сама форма
//   inputSelector: '.popup-container__infoform', //поле формы
//   submitButtonSelector: '.popup-container__button-add', //кнопка добавить/сохранить/создать
//   inactiveButtonClass: 'popup-container__button-add_error', //стиль неактивной кнопки
//   inputErrorClass: 'popup-container__input-error', //место с текстом об ошибке валидации
//   errorClass: 'popup-container__input-error_active' //появление ошибки валидации
// });

const formAuthor = document.querySelector('.popup-container__author');
const formPlace = document.querySelector('.popup-container__place');
const object = {
  inputSelector: '.popup-container__infoform', //поле формы
  submitButtonSelector: '.popup-container__button-add', //кнопка добавить/сохранить/создать
  inactiveButtonClass: 'popup-container__button-add_error', //стиль неактивной кнопки
  inputErrorClass: 'popup-container__input-error', //место с текстом об ошибке валидации
  errorClass: 'popup-container__input-error_active' //появление ошибки валидации
}

class FormValidator {
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

const formValidatorAuthor = new FormValidator (object, formAuthor);
formValidatorAuthor.enableValidation();

const formValidatorPlace = new FormValidator (object, formPlace);
formValidatorPlace.enableValidation();
