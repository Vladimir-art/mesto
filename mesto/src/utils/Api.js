import React from 'react';
import { baseUrl } from './utils';

class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }
//приватный фетч запрос
  _fetch(url, params) {
      params.headers = {
        authorization: 'f137b98e-3f11-4f62-a4b2-d83c32e82337',
        'Content-Type': 'application/json'
      };
    return fetch(this._baseUrl + url, params)
      .then((res) => {
        if(!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
  }
  //получаем карточки с сервера
  getInitialCards(url) {
    return this._fetch(url, {
      method: 'GET'
    })
  }
  //получает имя и деятельность автора с сервера
  getUserInterface(url) {
    return this._fetch(url, {
      method: 'GET'
    })
  }
  //отправить инфооацию об аторе на сервер и обновить ее
  sendUserInfo(url, data) {
    return this._fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        name: `${data.author}`,
        about: `${data.job}`
      })
    })
  }
  //отправить карточку на сервер
  sendPlaceCard(url, data) {
    return this._fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: `${data.name}`,
        link: `${data.link}`
      })
    })
  }
  //удалить карточку с сервера
  deleteCard(url) {
    return this._fetch(url, {
      method: 'DELETE'
    })
  }
 //поставить лайк и обновить массив лайков
  putLike(url) {
    return this._fetch(url, {
      method: 'PUT'
      })
  }
  //поменять аватар
  changeAvatar(url, data) {
    return this._fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: `${data.avatar}`
      })
    })
  }
}

export const api = new Api({baseUrl});
