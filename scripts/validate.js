const enableValidation = ({formSelector, ... rest}) => {
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));

  formList.forEach(f => setEventListeners(f, rest));
};

function setEventListeners(form, {inputSelector, submitButtonSelector, inactiveButtonClass, ... rest}) {
  const inputList = Array.from(form.querySelectorAll(`.${inputSelector}`));
  const btn = form.querySelector(`.${submitButtonSelector}`);

  toggleButtonState(inputList, btn, inactiveButtonClass);
  inputList.forEach( (i) => i.addEventListener('input', () => {
    toggleButtonState(inputList, btn, inactiveButtonClass);
    checkInputValidity(form, i, rest);
  }));
}

function showInputError(form, i, {inputErrorClass, errorClass}) {
  const errorElement = form.querySelector(`.${i.id}-error`);

  i.classList.add(inputErrorClass);
  errorElement.textContent = i.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(form, i, {inputErrorClass, errorClass}) {
  const errorElement = form.querySelector(`.${i.id}-error`);

  i.classList.remove(inputErrorClass);
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

function checkInputValidity(form, i, {inputErrorClass, errorClass}) {
  if (!i.validity.valid) {
    showInputError(form, i, {inputErrorClass, errorClass});
  }
  else {
    hideInputError(form, i, {inputErrorClass, errorClass});
  }
}

function hasInvalidInput(inputList) {
   return inputList.some( i => !i.validity.valid);
}

config = {
  formSelector: 'popup__form',
  inputSelector: 'popup__form-item',
  submitButtonSelector: 'popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__form-item_error',
  errorClass: 'popup__input-error_visible'
};

enableValidation(config);
