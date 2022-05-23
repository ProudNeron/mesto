export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = (dataCard) => {renderer.call(this, dataCard)};
    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(elementHtml) {
    document.querySelector(this._containerSelector).prepend(elementHtml);
  }
}
