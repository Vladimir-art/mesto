const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__button-edit');
const resetButton = content.querySelector('.popup-container__button-reset');
let popup = content.querySelector('.popup');
let addButton = content.querySelector('.popup-container__button-add');
let formElement = content.querySelector('.popup-container');

function editForm () {
  popup.classList.add('popup_opened');
  // выбираем поля формы
  let nameInput = content.querySelector('.popup-container__infoForm_author');
  let jobInput = content.querySelector('.popup-container__infoForm_aboutYourself');
  // присваиваем им значения
  nameInput.value;
  jobInput.value;
}

function resetForm () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    // выбираем поля формы
    let nameInput = content.querySelector('.popup-container__infoForm_author');
    let jobInput = content.querySelector('.popup-container__infoForm_aboutYourself');
    // присваиваем им значения
    nameInput.value;
    jobInput.value;
    // выбираем элементы, которые необходимо изменить
    let profileAuthor = content.querySelector('.profile__author');
    let profileSpecialty = content.querySelector('.profile__specialty');
    // присваиваем им новые значения
    profileAuthor.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;
}

editButton.addEventListener('click', editForm);
resetButton.addEventListener('click', resetForm);
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', resetForm);
