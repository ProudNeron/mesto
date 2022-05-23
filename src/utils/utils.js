import Card from "../components/Card.js";
import {editValidation, imagePopup} from "../pages";

function renderer(dataCard) {
  const newCard = new Card(
    {cardName: dataCard.name, cardImageUrl: dataCard.link,
      nameSelector: '.card__title', imageSelector: '.card__image'},
    {deleteBtn: '.card__delete-btn', likeBtn: '.card__like-button'},
    {likeBtn: 'card__like-button_active'},
    () => {
      imagePopup.open({name: dataCard.name, url: dataCard.link});
      imagePopup.setEventListeners();},
    '.card');

  this.addItem(newCard.getCard());
}

function openPopup(userData, popup) {
  const data = userData.getUserInfo();

  popup._form.elements['user-name'].value = data.userName;
  popup._form.elements['user-about'].value = data.userAbout;

  editValidation.enableSubmitBtn();
}

export {renderer, openPopup};
