//функция создания карточки
export class Card {
  constructor(api, item, {handleCardClick, handleCardDelete}, cardSelector) {
    this._api = api; //принимает экземпляр класса Api
    this._item = item;
    this._name = item.name; //имя картинки
    this._link = item.link; //ссылка на картинку
    this._handleCardClick = handleCardClick; //функция по открытию попапа с картинкой
    this._handleCardDelete = handleCardDelete; //удалять карточку
    this._cardSelector = document.querySelector(cardSelector);
  }
  //находим template элемент на странице и клонируем их
  _getTemplate() {
    const cardElement = this._cardSelector
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }
  //публичный метод: возвращает карточку со всей функциональностью
  generateCard() {
    this._element = this._getTemplate(); //присваивает template элементы
    this._setEventListeners(); //добавляет карточке слушатели событий
    this._isMyLike();
    this._element.querySelector('.element__place').textContent = this._name; //присваивает значения
    this._element.querySelector('.element__count').textContent = this._item.likes.length; //меняем количество лайков (получаем длину массива)
    this._hiddenButtonTrash();
    this._loadImage(this._link)//проверяем картинку на правильность ссылки
      .then((data) => {//если правильная, то выводит
        this._element.querySelector('.element__image').setAttribute('src', data.src);
        this._element.querySelector('.element__place').textContent = this._name;
    })
      .catch((err) => { //если нет, задает стандартную картинку и убирает лайки
        this._element.querySelector('.element__place').textContent = 'Ошибка';
        this._element.querySelector('.element__image').setAttribute('src', 'https://image.freepik.com/free-vector/404_115790-50.jpg');
        this._element.querySelector('.element__button').style.display = 'none'; //лайк
        this._element.querySelector('.element__count').style.display = 'none';//кол-во
        console.log(`Извините, такой картинки нет... ${err}`);
      });
    return this._element; //возвращает карточку
  }
  //приватный метод: устанавливает слушатели событий
  _setEventListeners() {
    this._element.querySelector('.element__button').addEventListener('click', (evt) => {
      this._handleLikeButton(evt); //ставить лайки карточкам
    });
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleCardDelete(this._element);//удалять карточку
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link); //открывает попап с картинкой
    });
  }
  //приватный метод: активный/неактивный лайк
  _handleLikeButton(evt) {
    if (!(evt.target.classList.contains('element__button_like-active'))) { //если кнопка лайка не имеет класса активного лайка, то
      this._api.putLike(`/cards/likes/${this._item._id}`, this._item)
        .then((data) => {
          evt.target.classList.add('element__button_like-active');
          this._element.querySelector('.element__count').textContent = data.likes.length; //длина массива из пользователей
        });
    } else {
      this._api.deleteCard(`/cards/likes/${this._item._id}`)
        .then((data) => {
          evt.target.classList.remove('element__button_like-active');
          this._element.querySelector('.element__count').textContent = data.likes.length;
        })
    }
  }
  //функция проверяет на какой карточке стоит мой лайк
  _isMyLike() {
    this._item.likes.some((item) => {
      if(item._id === '6f2fd362862b68aabdbf5f59') {
        this._element.querySelector('.element__button').classList.add('element__button_like-active');
      }
    })
  }
  //скрыть иконки удаления с чужих карточек
  _hiddenButtonTrash() {
    // this._element.setAttribute('id', this._item._id);
    if (!(this._item.owner._id === '6f2fd362862b68aabdbf5f59')) {
      this._element.querySelector('.element__trash').style.display = 'none';
    }
  }
  //проверяет правильность вводимой ссылки (существует ли ссылка на картинку)
  _loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image(); //Эквивалентно document.createElement ('img').
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", err => reject(err));
      img.src = src;
    });
  };
}
