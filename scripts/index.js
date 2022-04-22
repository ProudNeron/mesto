import {config, initialCards} from './consts.js';
import {Card} from './Card.js';
import {FormValidator} from "./FormValidator.js";

const cardList = document.querySelector('.cards__container');

const popupEdit = document.querySelector('.popup_btn_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const editBtn = document.querySelector('.profile__edit-button');

const popupAdd = document.querySelector('.popup_btn_add');
const formAdd = popupAdd.querySelector('.popup__form');
const addBtn = document.querySelector('.profile__add-button');

const popupImage = document.querySelector('.popup_img');
const figure = popupImage.querySelector('.popup__image');
const figureCaption = popupImage.querySelector('.popup__image-caption');

const userName = document.querySelector('.profile__user-name');
const aboutUser = document.querySelector('.profile__about-user');
const inputName = formEdit.querySelector('.popup__form-item_user_name');
const inputAboutUser = formEdit.querySelector('.popup__form-item_user_about');

const inputNameOfImage = formAdd.querySelector('.popup__form-item_image_name');
const inputUrl = formAdd.querySelector('.popup__form-item_image_url');

const addBtnListenerToDoc = () => {
  document.addEventListener('keydown', closeByEscButton);
}
const removeBtnListenerToDoc = () => {document.removeEventListener('keydown', closeByEscButton);
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  addBtnListenerToDoc();
}

const closePopup = (activePopup) => {
  activePopup.classList.remove('popup_opened');
  removeBtnListenerToDoc();
}

const openImagePopup = (name, url) => {
  figure.src = url;
  figure.alt = name;
  figureCaption.textContent = name;
  addBtnListenerToDoc();
  openPopup(popupImage);
}

const closeByEscButton = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

const handleClosePopup = (evt) => {
  if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__closed-btn')) {
    closePopup(evt.currentTarget);
  }
}

const createCard = (placeName, placeUrl) => {
  const newCard = new Card(
    {cardName: placeName, cardImageUrl: placeUrl, nameSelector: '.card__title', imageSelector: '.card__image'},
    {deleteBtn: '.card__delete-btn', likeBtn: '.card__like-button'},
    {likeBtn: 'card__like-button_active'},
    openImagePopup,
    '.card');

  return newCard.getCard();
}

const addCard = (placeName, placeUrl) => {
  cardList.prepend(createCard(placeName, placeUrl));
}

const handleAddCard = (evt) => {
  evt.preventDefault();
  addCard(inputNameOfImage.value, inputUrl.value);
  formAdd.reset();
  addValidation.disableSubmitBtn([inputNameOfImage, inputUrl], config.inactiveButtonClass);
  closePopup(popupAdd);
}

const handleEditProfile = (evt) => {
  evt.preventDefault();
  userName.textContent = inputName.value;
  aboutUser.textContent = inputAboutUser.value;
  closePopup(popupEdit);
}

initialCards.forEach( card => {
  addCard(card.name, card.link);
});

editBtn.addEventListener('click', () => {
  inputName.value = userName.textContent;
  inputAboutUser.value = aboutUser.textContent;
  editValidation.enableSubmitBtn([inputName, inputAboutUser], config.inactiveButtonClass);
  openPopup(popupEdit);
});

popupEdit.addEventListener('mousedown', handleClosePopup);
formEdit.addEventListener('submit', handleEditProfile);
addBtn.addEventListener('click', () => {openPopup(popupAdd)});
popupAdd.addEventListener('mousedown', handleClosePopup);
formAdd.addEventListener('submit', handleAddCard);
popupImage.addEventListener('mousedown', handleClosePopup);

const editValidation = new FormValidator(config, formEdit);
editValidation.enableValidation();

const addValidation = new FormValidator(config, formAdd);
addValidation.enableValidation();

