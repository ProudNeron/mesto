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
  }

  _setEventListeners({form, ...rest}) {
    const inputList = Array.from(form.querySelectorAll(this._config.inputSelector));

    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitBtn();
    } else {
      this.enableSubmitBtn();
    }
    inputList.forEach( (input) => input.addEventListener('input', () => {
      if (this._hasInvalidInput(inputList)) {
        this.disableSubmitBtn();
      } else {
        this.enableSubmitBtn();
      }
      this._checkInputValidity(form, input, rest);
    }));
  }

  _showInputError(form, input, {inputErrorClass, errorClass}) {
    const errorElement = form.querySelector(`.${input.id}-error`);

    input.classList.add(inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(form, input, {inputErrorClass, errorClass}) {
    const errorElement = form.querySelector(`.${input.id}-error`);

    input.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
  }

  _checkInputValidity(form, input, rest) {
    if (!input.validity.valid) {
      this._showInputError(form, input, rest);
    } else {
      this._hideInputError(form, input, rest);
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
    this._setEventListeners(
      {form: this._form,
        inputErrorClass: this._config.inputErrorClass,
        errorClass: this._config.errorClass});
  }
}
