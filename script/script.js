const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__button-edit');
const resetButton = content.querySelector('.popup-container__button-reset');
let popup = content.querySelector('.popup');
let formElement = content.querySelector('.popup-container');

function editForm () {
  popup.classList.add('popup_opened');
  // выбираем поля формы
  let nameInput = content.querySelector('.popup-container__infoform_author');
  let jobInput = content.querySelector('.popup-container__infoform_aboutyourself');
  let profileAuthor = content.querySelector('.profile__author');
  let profileSpecialty = content.querySelector('.profile__specialty');
  // присваиваем им значения //пробовал по-разному передать в поле формы текст из сайта, получается только через value...?//
  nameInput.value = profileAuthor.textContent;
  jobInput.value = profileSpecialty.textContent;
}

function resetForm () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    // выбираем поля формы
    let nameInput = content.querySelector('.popup-container__infoform_author');
    let jobInput = content.querySelector('.popup-container__infoform_aboutyourself');
    let profileAuthor = content.querySelector('.profile__author');
    let profileSpecialty = content.querySelector('.profile__specialty');
    // присваиваем им новые значения // есть ли смысл присваивать инпуту какой то текст, если он уже присвоен когда открывается форма...?//
    profileAuthor.textContent = nameInput.value;
    profileSpecialty.textContent = jobInput.value;

    resetForm();
}

editButton.addEventListener('click', editForm);
resetButton.addEventListener('click', resetForm);
formElement.addEventListener('submit', formSubmitHandler);

