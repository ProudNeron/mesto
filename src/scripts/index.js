import {initialCards, config} from "../utils/consts.js";
import {openPopup, renderer} from "../utils/utils.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {FormValidator} from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

import '../pages/index.css';

const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');

export const editValidation = new FormValidator(config,
  {popupSelector: '.popup_btn_edit', formSelector: '.popup__form'});
const addValidation = new FormValidator(config,
  {popupSelector: '.popup_btn_add', formSelector: '.popup__form'});

export const userData = new UserInfo(
  {userNameSelector: '.profile__user-name', userAboutSelector: '.profile__about-user'});

export const imagePopup = new PopupWithImage(
  { popupSelector: '.popup_img',
    closeBtn: 'popup__closed-btn',
    openedPopup: 'popup_opened'},
  { imgSelector: '.popup__image',
    titleSelector: '.popup__image-caption'}
);

const editedPopup = new PopupWithForm(
  { popupSelector: '.popup_btn_edit',
    formSelector: '.popup__form',
    closeBtn: 'popup__closed-btn',
    openedPopup: 'popup_opened'},
  (evt) => {
    evt.preventDefault();
    const inputValues = editedPopup._getInputValues();
    userData.setUserInfo({userName: inputValues['user-name'], userAbout: inputValues['user-about']});
    editedPopup.close();},
   function () {openPopup(userData, editedPopup);}
  );

export const gallery =  new Section({ items: initialCards, renderer: renderer},
  '.cards__container');


const addedPopup = new PopupWithForm(
  { popupSelector: '.popup_btn_add',
    formSelector: '.popup__form',
    closeBtn: 'popup__closed-btn',
    openedPopup: 'popup_opened'},
  (evt) => {
    evt.preventDefault();
    const inputValues = addedPopup._getInputValues();
    renderer.call(gallery, {name: inputValues['place-name'], link: inputValues['place-url']});
    addValidation.disableSubmitBtn();
    addedPopup.close();},
  () => {}
  );

gallery.renderItems();

editValidation.enableValidation();
addValidation.enableValidation();

editBtn.addEventListener('mousedown', () => {
  editedPopup.setEventListeners();
  editedPopup.open();
});

addBtn.addEventListener('mousedown', () => {
  addedPopup.setEventListeners();
  addedPopup.open();
});
