
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
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', ()=> {
      isValid(formElement, inputElement);
    });
  })
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup-container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  })
}

enableValidation();


