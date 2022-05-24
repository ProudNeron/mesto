import {initialCards, config, userName, userAbout} from "../utils/consts.js";
import {renderer} from "../utils/utils.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {FormValidator} from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

import './index.css';

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');


export const editValidation = new FormValidator(config,
  {popupSelector: '.popup_btn_edit', formSelector: '.popup__form'});
const addValidation = new FormValidator(config,
  {popupSelector: '.popup_btn_add', formSelector: '.popup__form'});

export const userData = new UserInfo(
  {userNameSelector: '.profile__user-name', userAboutSelector: '.profile__about-user'});

export const imagePopup = new PopupWithImage('.popup_img');

const editedPopup = new PopupWithForm(
  { popupSelector: '.popup_btn_edit',
    formSubmit: (inputValues) => {
    userData.setUserInfo({userName: inputValues['user-name'], userAbout: inputValues['user-about']});
    editedPopup.close();}
  });

export const gallery =  new Section({ items: initialCards, renderer: renderer},
  '.cards__container');


const addedPopup = new PopupWithForm(
  { popupSelector: '.popup_btn_add',
    formSubmit: (inputValues) => {
    renderer.call(gallery, {name: inputValues['place-name'], link: inputValues['place-url']});
    addValidation.disableSubmitBtn();
    addedPopup.close(); }
  });

gallery.renderItems();

editedPopup.setEventListeners();
addedPopup.setEventListeners();
imagePopup.setEventListeners();

editValidation.enableValidation();
addValidation.enableValidation();

editBtn.addEventListener('mousedown', () => {
  const data = userData.getUserInfo();

  userName.value = data.userName;
  userAbout.value = data.userAbout;

  editValidation.enableValidation();

  editedPopup.open();
});

addBtn.addEventListener('mousedown', () => {
  addedPopup.open();
});
