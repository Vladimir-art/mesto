const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__button-edit');
const resetButton = content.querySelector('.popup-container__button-reset');
let popup = content.querySelector('.popup');
let addButton = content.querySelector('.popup-container__button-add');

function editForm () {
  popup.classList.add('popup_opened');
}

function resetForm () {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', editForm);
resetButton.addEventListener('click', resetForm);

let formElement = content.querySelector('.popup-container');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInput = content.querySelector('.popup-container__author');
    let jobInput = content.querySelector('.popup-container__aboutYourself');

    nameInput.getAttribute('value');
    jobInput.getAttribute('value');

    let profileAuthor = content.querySelector('.profile__author');
    let profileSpecialty = content.querySelector('.profile__specialty');

    profileAuthor.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;

    addButton.addEventListener('click', resetForm);
}

formElement.addEventListener('submit', formSubmitHandler);
