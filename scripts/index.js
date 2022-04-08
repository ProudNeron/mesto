const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardList = document.querySelector('.cards__container');
const cardTemplate = cardList.querySelector('.card-template').content;

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(activePopup) {
  activePopup.classList.remove('popup_opened');
}

function closeByEscButton(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    removeBtnListenrToDoc();
    closePopup(activePopup);
  }
}

function addBtnListenerToDoc() {
  document.addEventListener('keydown', closeByEscButton);
}

function removeBtnListenrToDoc() {
  document.removeEventListener('keydown', closeByEscButton);
}

function handleClosePopup(evt) {
  if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__closed-btn')) {
    removeBtnListenrToDoc();
    closePopup(evt.currentTarget);
  }
}

function handleEditProfile(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  aboutUser.textContent = inputAboutUser.value;
  removeBtnListenrToDoc();
  closePopup(popupEdit);
}

function toggleLike(evt) {
  if (evt.currentTarget === evt.target) {
    evt.currentTarget.classList.toggle('card__like-button_active');
  }
}

function createCard(name, url) {
  const newCard = cardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTitle = newCard.querySelector('.card__title');
  const newCardLikeBtn = newCard.querySelector('.card__like-button');
  const newCardDeleteBtn = newCard.querySelector('.card__delete-btn');
  newCardTitle.textContent = name;
  newCardImage.src = url;
  newCardImage.alt = name;
  newCardLikeBtn.addEventListener('click', toggleLike);
  newCardDeleteBtn.addEventListener('click', removeCard);
  newCardImage.addEventListener('click', function() {
    figure.src = url;
    figure.alt = name;
    figureCaption.textContent = name;
    addBtnListenerToDoc();
    openPopup(popupImage);
  });
  return newCard;
}

function removeCard(evt) {
  const removingCard = evt.currentTarget.closest('.card');
  removingCard.remove();
}

function addCard(placeName, placeUrl) {
  const newCard = createCard(placeName, placeUrl);
  cardList.prepend(newCard);
}

function handleAddCard(evt) {
  evt.preventDefault();
  addCard(inputNameOfImage.value, inputUrl.value);
  formAdd.reset();
  toggleButtonState([inputNameOfImage, inputUrl], evt.submitter, config.inactiveButtonClass);
  removeBtnListenrToDoc();
  closePopup(popupAdd);
}

initialCards.forEach( item => addCard(item.name, item.link));

editBtn.addEventListener('click', () => {
  inputName.value = userName.textContent;
  inputAboutUser.value = aboutUser.textContent;
  toggleButtonState([inputName, inputAboutUser], formEdit.querySelector(`.${config.submitButtonSelector}`), config.inactiveButtonClass);
  addBtnListenerToDoc();
  openPopup(popupEdit);
});
popupEdit.addEventListener('mousedown', handleClosePopup);
formEdit.addEventListener('submit', handleEditProfile);

addBtn.addEventListener('click', () => {
  addBtnListenerToDoc();
  openPopup(popupAdd)});
popupAdd.addEventListener('mousedown', handleClosePopup);
formAdd.addEventListener('submit', handleAddCard);

popupImage.addEventListener('mousedown', handleClosePopup);
