export default class FormValidator {
  constructor(config, {popupSelector, formSelector}) {
    this._config = {
      inputSelector: config.inputSelector,
      inactiveButtonClass: config.inactiveButtonClass,
      inputErrorClass: config.inputErrorClass,
      errorClass: config.errorClass
    };
    this._form = document.querySelector(popupSelector).querySelector(formSelector);
    this._submitBtn = this._form.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  }

  _toggleButtonState(){
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitBtn();
    } else {
      this.enableSubmitBtn();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach( (input) => input.addEventListener('input', () => {
      this._toggleButtonState();
      this._checkInputValidity(input);
    }));
  }

  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);

    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid);
  }

  disableSubmitBtn() {
    this._submitBtn.classList.add(this._config.inactiveButtonClass);
    this._submitBtn.setAttribute('disabled', true);
  }

  enableSubmitBtn() {
    this._submitBtn.classList.remove(this._config.inactiveButtonClass);
    this._submitBtn.removeAttribute('disabled');
  }

  enableValidation() {
    this._setEventListeners();
  }
}
