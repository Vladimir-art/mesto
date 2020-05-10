const formElement = document.querySelector('.popup-container');
const formInputAuthor = formElement.querySelector('.popup-container__infoform_author');
const formInputJob = formElement.querySelector('.popup-container__infoform_aboutyourself');

const showInputError = (element) => {
  element.classList.add('popup-container__infoform_type_error');
};

const hideInputError = (element) => {
  element.classList.remove('popup-container__infoform_type_error');
};

const isValid = () => {
  if (!formInputAuthor.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formInputAuthor);
  } else {
    // Если проходит, скроем
    hideInputError(formInputAuthor);
  }
};

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
})

formInputAuthor.addEventListener('input', isValid);

