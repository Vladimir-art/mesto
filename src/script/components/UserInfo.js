//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor({ nameSelector, jobSelector, avatar, inputAuthor, inputJob }, api) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this.avatar = document.querySelector(avatar);
    this._nameInput = inputAuthor;
    this._jobInput = inputJob;
    this._api = api;
  }
  //меняем шапку профиля в DOM
  userInterface() {
    this._api.getUserInterface('/users/me')
      .then((data) => {
        this._nameSelector.textContent = data.name;
        this._jobSelector.textContent = data.about;
        this.avatar.setAttribute('src', `${data.avatar}`);
        this.avatar.id = `${data._id}`;
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`)
      })
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    this._nameInput.value = this._nameSelector.textContent;
    this._jobInput.value = this._jobSelector.textContent;
    return {
      author: this._nameInput.value,
      job: this._jobInput.value
    }
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(formData, popupSelector, text) {
    this._api.sendUserInfo('/users/me', formData) //отправием новые данные на сервер
      .then((data) => {
        this._nameSelector.textContent = data.name;
        this._jobSelector.textContent = data.about;
        popupSelector.classList.remove('popup_opened');
        popupSelector.querySelector('.popup-container__button-add').textContent = text;
      })
      .catch((err) => {
        console.log(`Упс, произошла ошибка: ${err}`)
      })
  }
}
