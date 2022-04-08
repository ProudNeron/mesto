const enableValidation = ({formSelector, ... rest}) => {
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));

  formList.forEach(form => setEventListeners(form, rest));
};

function setEventListeners(form, {inputSelector, submitButtonSelector, inactiveButtonClass, ... rest}) {
  const inputList = Array.from(form.querySelectorAll(`.${inputSelector}`));
  const btn = form.querySelector(`.${submitButtonSelector}`);

  toggleButtonState(inputList, btn, inactiveButtonClass);
  inputList.forEach( (input) => input.addEventListener('input', () => {
    toggleButtonState(inputList, btn, inactiveButtonClass);
    checkInputValidity(form, input, rest);
  }));
}

function showInputError(form, input, {inputErrorClass, errorClass}) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(form, input, {inputErrorClass, errorClass}) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function toggleButtonState(inputList, btn, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    btn.classList.add(inactiveButtonClass);
    btn.setAttribute('disabled', true);
  } else {
    btn.classList.remove(inactiveButtonClass);
    btn.removeAttribute('disabled');
  }
}

function checkInputValidity(form, input, {inputErrorClass, errorClass}) {
  if (!input.validity.valid) {
    showInputError(form, input, {inputErrorClass, errorClass});
  } else {
    hideInputError(form, input, {inputErrorClass, errorClass});
  }
}

function hasInvalidInput(inputList) {
   return inputList.some( input => !input.validity.valid);
}

const config = {
  formSelector: 'popup__form',
  inputSelector: 'popup__form-item',
  submitButtonSelector: 'popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__form-item_error',
  errorClass: 'popup__input-error_visible'
};

enableValidation(config);
