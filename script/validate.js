
// функция показывает тест с ошибкой введения данных (принимает объект, форму, поля формы и тест ошибки)
const showInputError = (object, formElement, element, errorMessage) => {
  const errorElement = formElement.querySelector(`#${element.id}-error`); //находим место где появляется ошибка из DOM по его id
  element.classList.add('popup-container__infoform_type_error'); //добавляем полям формы стиль с красным подчеркиванием
  errorElement.textContent = errorMessage; //передаем текст ошибки валидации
  errorElement.classList.add(object.errorClass); //подключаем стиль появления текста ошибки
};

//функция скрытия текста ошибки и красной линии полей форм (также как и в функции showInputError)
const hideInputError = (object, formElement, element) => {
  const errorElement = formElement.querySelector(`#${element.id}-error`);
  element.classList.remove('popup-container__infoform_type_error');
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

//функция проверки на валидность всей формы (принимает объект, саму форму и её поле)
const isValid = (object, formElement, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(object, formElement, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(object, formElement, formInput);
  };
};

//функция создания массива полей формы и их проверки на валидность (принимает объект и форму)
const setEventListeners = (object, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector)); //создаем массив полей формы
  const buttonElement = formElement.querySelector(object.submitButtonSelector); //находим в DOM кнопку добавления из формы
  toggleButtonState(object, inputList, buttonElement); //поверяем валидность полей формы и делаем кнопку неактивной
  //проходим по каждому полю
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', ()=> { //проверяем каждый символ, введенный в поле
      isValid(object, formElement, inputElement); //проверяем на валидность и показываем ошибки
      toggleButtonState(object, inputList, buttonElement); //делаем кнопку активной или неактивной
    });
  });
};

//функция проверки каждого поля на валидность (принимает массив полей формы)
const hasInvalidInput = (inputList) => {
  //методом some проверяем поля (до первого невалидного поля)
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; //если поле невалидно - возвращаем true
  });
};

//функция активной/неактивной кнопки (принимает объект, массив полей и кнопку соответвующей формы)
const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) { //если хоть одно поле невалидно
    buttonElement.classList.add(object.inactiveButtonClass); //добавляем кнопке класс со стилем неактивной кнопки (серой)
    buttonElement.addEventListener('click', (evt) => {
      removeSubmitListeners(evt);
    });
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(object.inactiveButtonClass);
    //при клике на кнопку проверим что все поля валидны и добавим их на страницу
    buttonElement.addEventListener('click', (evt) => {
      setSubmitListeners(evt);
    });
  }
};

//функция, с которой все начинется - функция создания массива форм страницы
const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formElement)); //создает массив из всех форм
  //проходит по каждой форме
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); //отменяет стандарное поведение браузера при отправке формы на страницу
    });
    setEventListeners(object, formElement); //вызывает функцию по проверке полей каждой формы на валидность
  });
};
//вызываем функцию, передаем ей объект с полями форм, которые надо проверить
enableValidation({
  formElement: '.popup-container', //сама форма
  inputSelector: '.popup-container__infoform', //поле формы
  submitButtonSelector: '.popup-container__button-add', //кнопка добавить/сохранить/создать
  inactiveButtonClass: 'popup-container__button-add_error', //стиль неактивной кнопки
  inputErrorClass: 'popup-container__input-error', //место с текстом об ошибке валидации
  errorClass: 'popup-container__input-error_active' //появление ошибки валидации
});

