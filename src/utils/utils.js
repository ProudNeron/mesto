import Card from "../components/Card.js";
import {imagePopup} from "../pages";

function renderer(dataCard) {
  const newCard = new Card(
    {cardName: dataCard.name, cardImageUrl: dataCard.link,
      nameSelector: '.card__title', imageSelector: '.card__image'},
    {deleteBtn: '.card__delete-btn', likeBtn: '.card__like-button'},
    {likeBtn: 'card__like-button_active'},
    () => imagePopup.open({name: dataCard.name, url: dataCard.link}),
    '.card');

  this.addItem(newCard.getCard());
}

export {renderer};
