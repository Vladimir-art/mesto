
const showInputError = (formElement, element, errorMessage) => {
  const errorElement = formElement.querySelector(`#${element.id}-error`);
  element.classList.add('popup-container__infoform_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup-container__input-error_active');
};

const hideInputError = (formElement, element) => {
  const errorElement = formElement.querySelector(`#${element.id}-error`);
  element.classList.remove('popup-container__infoform_type_error');
  errorElement.classList.remove('popup-container__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, formInput);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup-container__infoform'));
  const buttonElement = formElement.querySelector('.popup-container__button-add');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', ()=> {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  })
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup-container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
  // Обход массива прекратится и вся фунцкция
  // hasInvalidInput вернёт true

  return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup-container__button-add_error');
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove('popup-container__button-add_error');
  }
};

enableValidation({
  formElement: '.popup-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

