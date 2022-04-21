class FormValidator {
  constructor(config, form) {
    this._config = {
      inputSelector: config.inputSelector,
      submitButtonSelector: config.submitButtonSelector,
      inactiveButtonClass: config.inactiveButtonClass,
      inputErrorClass: config.inputErrorClass,
      errorClass: config.errorClass
    };
    this._form = form;
  }

  _setEventListeners({form, ...rest}) {
    const inputList = Array.from(form.querySelectorAll(this._config.inputSelector));
    const btn = form.querySelector(this._config.submitButtonSelector);

    this.toggleButtonState(inputList, btn, this._config.inactiveButtonClass);
    inputList.forEach( (input) => input.addEventListener('input', () => {
      this.toggleButtonState(inputList, btn, this._config.inactiveButtonClass);
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

  toggleButtonState(inputList, btn, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      btn.classList.add(inactiveButtonClass);
      btn.setAttribute('disabled', true);
    } else {
      btn.classList.remove(inactiveButtonClass);
      btn.removeAttribute('disabled');
    }
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

  enableValidation() {
    this._setEventListeners(
      {form: this._form,
        inputErrorClass: this._config.inputErrorClass,
        errorClass: this._config.errorClass});
  }
}

export {FormValidator};
