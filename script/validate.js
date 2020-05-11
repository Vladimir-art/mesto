nameInput.value = profileAuthor.textContent;
jobInput.value = profileSpecialty.textContent;

const showInputError = (object, formElement, element, errorMessage) => {
  const errorElement = formElement.querySelector(`#${element.id}-error`);
  element.classList.add('popup-container__infoform_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

const hideInputError = (object, formElement, element) => {
  const errorElement = formElement.querySelector(`#${element.id}-error`);
  element.classList.remove('popup-container__infoform_type_error');
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

const isValid = (object, formElement, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(object, formElement, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(object, formElement, formInput);
  }
};

const setEventListeners = (object, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(object, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', ()=> {
      isValid(object, formElement, inputElement);
      toggleButtonState(object, inputList, buttonElement);
    });
  })
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formElement));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(object, formElement);
  })
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
  } else {
        // иначе сделай кнопку активной
    buttonElement.classList.remove(object.inactiveButtonClass);
  }
};

enableValidation({
  formElement: '.popup-container',
  inputSelector: '.popup-container__infoform',
  submitButtonSelector: '.popup-container__button-add',
  inactiveButtonClass: 'popup-container__button-add_error',
  inputErrorClass: 'popup-container__input-error',
  errorClass: 'popup-container__input-error_active'
});

