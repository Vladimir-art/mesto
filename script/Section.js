//класс для добавления эелементов на страницу

export class Section {
  constructor( {items, renderer}, containerSelector) {
    this._items = items; //массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице.
    this._containerSelector = document.querySelector(containerSelector); //селектор контейнера, в который нужно добавлять созданные элементы
  }

  addItem() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  appendItem(element) {
    this._containerSelector.append(element);
  }

  prependItem(element) {
    this._containerSelector.prepend(element);
  }

}
