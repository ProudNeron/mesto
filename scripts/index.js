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

const popupTemplate = document.querySelector('.popup-template').content;

const cardList = document.querySelector('.cards__container');
const cardTemplate = cardList.querySelector('.card-template').content;

const popupEdit = document.querySelector('.popup_btn_edit');
const formEdit = popupEdit.querySelector('.popup__form');
const editBtn = document.querySelector('.profile__edit-button');

const popupAdd = document.querySelector('.popup_btn_add');
const formAdd = popupAdd.querySelector('.popup__form');
const addBtn = document.querySelector('.profile__add-button');

let userName = document.querySelector('.profile__user-name');
let aboutUser = document.querySelector('.profile__about-user');
let inputName = popupEdit.querySelector('.popup__form-item_user_name');
let inputAboutUser = popupEdit.querySelector('.popup__form-item_user_about');

let inputNameOfImage = popupAdd.querySelector('.popup__form-item_image_name');
let inputUrl = popupAdd.querySelector('.popup__form-item_image_url');

function openPopup(evt) {
  if (evt.currentTarget === editBtn)
  {
    inputName.value = userName.textContent;
    inputAboutUser.value = aboutUser.textContent;
    popupEdit.classList.add('popup_opened');
  }
  if (evt.currentTarget === addBtn)
  {
    popupAdd.classList.add('popup_opened');
  }
}

function closePopup(evt) {
  const activePopup = evt.currentTarget;
  const closedBtn = activePopup.querySelector('.popup__closed-btn');
  const submitBtn = activePopup.querySelector('.popup__submit-btn');

  if (evt.target === activePopup || evt.target === closedBtn || evt.target === submitBtn)
  {
    activePopup.classList.remove('popup_opened');
    if (!activePopup.classList.contains('popup_img'))
    {
      activePopup.querySelectorAll('.text-input').textContent = '';
    }
  }
}

function sendForm(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  aboutUser.textContent = inputAboutUser.value;
  closePopup(evt);
}

function addLike(evt) {
  if (evt.currentTarget === evt.target)
  {
    evt.currentTarget.classList.toggle('card__like-button_active');
  }
}

function removeCard(evt) {
  const removingCard = evt.currentTarget.closest('.card');
  removingCard.remove();
}

function createPopup(evt) {
  const  placeName = evt.currentTarget.closest('.card').querySelector('.card__title').textContent;
  const placeLink = evt.currentTarget.closest('.card').querySelector('.card__image').src;
  const newPopup = popupTemplate.cloneNode(true);

  newPopup.querySelector('.popup__image').src = placeLink;
  newPopup.querySelector('.popup__image').alt = placeName;
  newPopup.querySelector('.popup__image-caption').textContent = placeName;
  popupAdd.after(newPopup);

  const addedPopup = document.querySelector('.popup_img');
  addedPopup.addEventListener('click', closePopup);
  addedPopup.classList.add('popup_opened');
}

function addCard(placeName, placeUrl) {
  const Name = placeName;
  const Link = placeUrl;
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.card__title').textContent = placeName;
  newCard.querySelector('.card__image').src = placeUrl;
  newCard.querySelector('.card__image').alt = placeName;

  newCard.querySelector('.card__like-button').addEventListener('click', addLike);
  newCard.querySelector('.card__delete-btn').addEventListener('click', removeCard);
  newCard.querySelector('.card__image').addEventListener('click', createPopup);
  cardList.prepend(newCard);
}

function addCardHandle(evt) {
  evt.preventDefault();
  addCard(inputNameOfImage.value, inputUrl.value);
  closePopup(evt);
}

initialCards.forEach( item => addCard(item.name, item.link));

editBtn.addEventListener('click', openPopup);
popupEdit.addEventListener('click', closePopup);
formEdit.addEventListener('submit', sendForm);

addBtn.addEventListener('click', openPopup);
popupAdd.addEventListener('click', closePopup);
formAdd.addEventListener('submit', addCardHandle);
