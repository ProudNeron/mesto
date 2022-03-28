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
const inputName = popupEdit.querySelector('.popup__form-item_user_name');
const inputAboutUser = popupEdit.querySelector('.popup__form-item_user_about');

const inputNameOfImage = popupAdd.querySelector('.popup__form-item_image_name');
const inputUrl = popupAdd.querySelector('.popup__form-item_image_url');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(activePopup) {
  activePopup.classList.remove('popup_opened');
}

function handleEditProfile(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  aboutUser.textContent = inputAboutUser.value;
  closePopup(popupEdit);
}

function toggleLike(evt) {
  if (evt.currentTarget === evt.target)
  {
    evt.currentTarget.classList.toggle('card__like-button_active');
  }
}

function removeCard(evt) {
  const removingCard = evt.currentTarget.closest('.card');
  removingCard.remove();
}

function addCard(placeName, placeUrl) {
  const Name = placeName;
  const Link = placeUrl;
  const newCard = cardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');
  const newCardTitle = newCard.querySelector('.card__title');
  const newCardLikeBtn = newCard.querySelector('.card__like-button');
  const newCardDeleteBtn = newCard.querySelector('.card__delete-btn');

  newCardTitle.textContent = placeName;
  newCardImage.src = placeUrl;
  newCardImage.alt = placeName;
  newCardLikeBtn.addEventListener('click', toggleLike);
  newCardDeleteBtn.addEventListener('click', removeCard);
  newCardImage.addEventListener('click', function() {
    figure.src = Link;
    figure.alt = Name;
    figureCaption.textContent = Name;
    openPopup(popupImage);
  });
  cardList.prepend(newCard);
}

function handleAddCard(evt) {
  evt.preventDefault();
  addCard(inputNameOfImage.value, inputUrl.value);
  formAdd.reset();
  closePopup(popupAdd);
}

initialCards.forEach( item => addCard(item.name, item.link));

editBtn.addEventListener('click', function () {
  inputName.value = userName.textContent;
  inputAboutUser.value = aboutUser.textContent;
  openPopup(popupEdit);
});
popupEdit.addEventListener('click', function(evt) {
  const closedBtn = evt.currentTarget.querySelector('.popup__closed-btn');
  if (evt.currentTarget === evt.target || evt.target === closedBtn)
  {
    closePopup(evt.currentTarget);
    formEdit.reset();
  }
});
formEdit.addEventListener('submit', handleEditProfile);

addBtn.addEventListener('click', () => openPopup(popupAdd));
popupAdd.addEventListener('click', function(evt) {
  const closedBtn = evt.currentTarget.querySelector('.popup__closed-btn');
  if (evt.currentTarget === evt.target || evt.target === closedBtn)
  {
    closePopup(evt.currentTarget);
    formAdd.reset();
  }
});
formAdd.addEventListener('submit', handleAddCard);

popupImage.addEventListener('click', function(evt) {
  const closedBtn = evt.currentTarget.querySelector('.popup__closed-btn');
  if (evt.currentTarget === evt.target || evt.target === closedBtn)
  {
    closePopup(evt.currentTarget);
  }
});
