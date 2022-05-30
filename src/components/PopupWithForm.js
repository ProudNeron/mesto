import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formSubmit}) {
    super(popupSelector);

    this._form = this._popup.querySelector('.popup__form');
    this._formSubmit = formSubmit;
    this._submitBtn = this._form.querySelector('.popup__submit-btn');
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = this._submitBtn.textContent + '...';
    } else {
      this._submitBtn.textContent = this._submitBtn.textContent.slice(0, length-3);
    }
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
      this.renderLoading(true);
      this._formSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
