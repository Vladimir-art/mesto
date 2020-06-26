
export class API {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  _fetch(url, params) {
      params.headers = {
        authorization: 'f137b98e-3f11-4f62-a4b2-d83c32e82337',
        'Content-Type': 'application/json'
      };
      params.body = JSON.stringify(params.body);

    return fetch(this._baseUrl + url, params)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  // getInitialCards() {
  //   return fetch(`${this._url}`, {
  //     method: 'GET',
  //     headers: this._headers
  //   })
  //     .then(res => res.json())
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка: ${err}`);
  //     })
  // }

  getUserInterface(url) {
    return this._fetch(url, {
      method: 'GET'
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
