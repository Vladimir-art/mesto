import { author, job, avatar } from "../utils/constants.js";

export class API {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => res.json())
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  getUserInterface() {
    fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => res.json())
      .then((res) => {
        document.querySelector(author).textContent = res.name;
        document.querySelector(job).textContent = res.about;
        document.querySelector(avatar).getAttribute('src', `${res.avatar}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
}




// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   }
// });
