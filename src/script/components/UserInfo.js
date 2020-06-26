//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
import { nameInput, jobInput, baseUrl } from "../utils/constants.js";
import { API } from "./API.js";

export class UserInfo {
  constructor({ nameSelector, jobSelector, avatar }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this.avatar = document.querySelector(avatar);
    this._nameInput = nameInput;
    this._jobInput = jobInput;
    this._api = new API( {baseUrl} );
  }
  //меняем шапку профиля в DOM
  userInterface() {
    this._api.getUserInterface('/users/me')
      .then((data) => {
        this._nameSelector.textContent = data.name;
        this._jobSelector.textContent = data.about;
        this.avatar.setAttribute('src', `${data.avatar}`);
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
  setUserInfo(form) {
    this._nameSelector.textContent = form.author;
    this._jobSelector.textContent = form.job;
    this._api.sendUserInfo('/users/me', form);
  }
}
