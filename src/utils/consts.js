import Api from "../components/Api";
import FormValidator from "../components/FormValidator";

const config = {
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__form-item_error',
  errorClass: 'popup__input-error_visible'
};

const token = "ed0da025-14aa-485c-bca8-15b396de5e8a";
const serverUrl = "https://mesto.nomoreparties.co/v1/cohort-41/";

const api = new Api({url: serverUrl, headers: {authorization: token}});

const userName = document.querySelector('#user-name');
const userAbout = document.querySelector('#user-about');

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const editAvatarBtn = document.querySelector('.profile__change-avatar-button');

const editProfileDataValidation = new FormValidator(config,
  {popupSelector: '.popup_type_edit-user-data', formSelector: '.popup__form'});
const editProfileAvatarValidation = new FormValidator(config,
  {popupSelector: '.popup_type_change-avatar', formSelector: '.popup__form'});
const addValidation = new FormValidator(config,
  {popupSelector: '.popup_type_add-card', formSelector: '.popup__form'});

export {config, userName, userAbout, api, editBtn, addBtn, editAvatarBtn, editProfileDataValidation,
  editProfileAvatarValidation, addValidation};
