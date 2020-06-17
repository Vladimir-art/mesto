//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
import { nameInput, jobInput } from "../utils/constants.js";

export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._nameInput = nameInput;
    this._jobInput = jobInput;
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
  setUserInfo(author, job) {
    this._nameSelector.textContent = author;
    this._jobSelector.textContent = job;
  }
}
