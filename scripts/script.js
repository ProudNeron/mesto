const popup = document.querySelector('.popup');
const editBtn = document.querySelector('.profile__edit-button');
const closedBtn = popup.querySelector('.popup__closed-btn');
const saveBtn = popup.querySelector('.popup__save-btn');
let userInput = popup.querySelectorAll('.popup__form-item');
let userInfo = [document.querySelector('.profile__user-name'), document.querySelector('.profile__about-user')];


function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopupHandler() {
  openPopup();
  for (let i=0;i<userInput.length;++i)
  {
    userInput[i].value = userInfo[i].textContent;
  }
  return;
}

function closePopupHandler(evt) {
  if (evt.target === closedBtn)
  {
    closePopup();
  }
  if (evt.target === evt.currentTarget)
  {
    closePopup();
  }
}

function editProfileHandler() {
  for (let i=0;i<userInput.length;++i)
  {
    userInfo[i].textContent = userInput[i].value;
    userInput[i].value = "";
  }
  closePopup();
  return;
}

popup.addEventListener('click', closePopupHandler);
editBtn.addEventListener('click', openPopupHandler);
saveBtn.addEventListener('click', editProfileHandler);
