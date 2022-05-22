import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formSelector, ... arr}, formSubmit, openPopup) {
    super({popupSelector, ... arr});

    this._form = this._popup.querySelector(formSelector);
    this._formSubmit = formSubmit.bind(this);
    this._openPopup = openPopup;
  }

  _getInputValues() {
    const formItems = Array.from(this._form.elements);
    const inputValues = {};

    for (let formItem of formItems) {
      inputValues[`${formItem.id}`] = formItem.value;
    }

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', this._formSubmit);
  }

  close() {
    this._form.reset();
    super.close();
  }

  open() {
    this._openPopup();
    super.open();
  }
}
