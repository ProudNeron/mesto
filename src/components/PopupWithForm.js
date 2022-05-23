import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formSubmit}) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    const formItems = Array.from(this._form.elements);
    const inputValues = {};

    formItems.forEach(formItem => inputValues[`${formItem.id}`] = formItem.value);

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  open() {

    super.open();
  }
}
