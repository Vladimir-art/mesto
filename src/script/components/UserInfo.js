//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
import { nameInput, jobInput } from "../utils/constants.js";

export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
   return {
    nameInput: this._nameSelector.textContent,
    jobInput: this._jobSelector.textContent
    };
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo() {
    this._nameSelector.textContent = nameInput.value;
    this._jobSelector.textContent = jobInput.value;
  }
}
