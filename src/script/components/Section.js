//класс для добавления эелементов на страницу

export class Section {
  constructor( {renderer}, containerSelector) {
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице.
    this._containerSelector = document.querySelector(containerSelector); //селектор контейнера, в который нужно добавлять созданные элементы
  }

  addItem(array) {
    array.forEach((item) => {
      this._renderer(item);
    });
  }

  prependItem(element) {
    this._containerSelector.append(element);
  }

}
