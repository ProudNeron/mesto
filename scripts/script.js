const popup = document.querySelector('.popup');
const editBtn = document.querySelector('.profile__edit-button');
const closedBtn = popup.querySelector('.popup__closed-btn');
const saveBtn = popup.querySelector('.popup__save-btn');
let userInput = popup.querySelectorAll('.popup__form-item');
let userInfo = [document.querySelector('.profile__user-name'), document.querySelector('.profile__about-user')];

function openPopupHandler() {
  popup.classList.add('popup_opened');
  return;
}

function closePopupHandler() {
  popup.classList.remove('popup_opened');
  for (let i=0;i<userInput.length;++i)
  {
    userInput[i].value = "";
  }
  return;
}

function editProfileHandler() {
  for (let i=0;i<userInput.length;++i)
  {
    userInfo[i].textContent = userInput[i].value;
    userInput[i].value = "";
  }
  closePopupHandler();
  return;
}

editBtn.addEventListener('click', openPopupHandler);
closedBtn.addEventListener('click', closePopupHandler);
saveBtn.addEventListener('click', editProfileHandler);
