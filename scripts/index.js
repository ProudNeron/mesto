const popup = document.querySelector('.popup');
const form = popup.querySelector('.popup__container');
const closedBtn = popup.querySelector('.popup__closed-btn');
const editBtn = document.querySelector('.profile__edit-button');

let userName = document.querySelector('.profile__user-name');
let aboutUser = document.querySelector('.profile__about-user');
let inputName = popup.querySelector('.text-input_user-name');
let inputAboutUser = popup.querySelector('.text-input_user-about');

function openPopup() {
  inputName.value = userName.textContent;
  inputAboutUser.value = aboutUser.textContent;
  popup.classList.add('popup_opened');
}

function closePopup(evt) {
  evt.preventDefault();
  if (evt.target === evt.currentTarget || evt.target === closedBtn)
  {
    popup.classList.remove('popup_opened');
  }
  if (evt.target === popup.querySelector('.popup__save-btn'))
  {
    userName.textContent = inputName.value;
    aboutUser.textContent = inputAboutUser.value;
    popup.classList.remove('popup_opened');
  }
}

editBtn.addEventListener('click', openPopup);
popup.addEventListener('click', closePopup);
form.addEventListener('submit', closePopup);
