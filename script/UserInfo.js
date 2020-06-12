//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
import { nameInput, jobInput } from "./index.js";

export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    nameInput.value = this._nameSelector.textContent;
    jobInput.value = this._jobSelector.textContent;
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    this._nameSelector.textContent = nameInput.value;
    this._jobSelector.textContent = jobInput.value;
  }
}
