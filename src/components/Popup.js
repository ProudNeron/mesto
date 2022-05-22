export default class Popup {
  constructor({popupSelector, closeBtn, openedPopup}) {
    this._classes = {closeBtn: closeBtn, openedPopup: openedPopup};
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.close();
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._classes.openedPopup) ||
        evt.target.classList.contains(this._classes.closeBtn)) {
          this.close();
      }
    });

  }

  open() {
    this._popup.classList.add(this._classes.openedPopup);
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove(this._classes.openedPopup);
  }
}
