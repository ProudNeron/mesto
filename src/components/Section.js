export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = (dataCard) => {renderer.call(this, dataCard)};
    this._containerSelector = containerSelector;
  }

  renderItems() {
    for (let item of this._items) {
      this._renderer(item);
    }
  }

  addItem(elementHtml) {
    document.querySelector(this._containerSelector).prepend(elementHtml);
  }
}
