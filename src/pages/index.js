import {config, userName, userAbout, editBtn, addBtn, editAvatarBtn, serverUrl, token} from "../utils/consts.js";
import Card from "../components/Card.js"
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator";

import './index.css';

const api = new Api({url: serverUrl, headers: {authorization: token, 'Content-type': 'application/json'}});

const editProfileDataValidation = new FormValidator(config,
  {popupSelector: '.popup_type_edit-user-data', formSelector: '.popup__form'});
const editProfileAvatarValidation = new FormValidator(config,
  {popupSelector: '.popup_type_change-avatar', formSelector: '.popup__form'});
const addValidation = new FormValidator(config,
  {popupSelector: '.popup_type_add-card', formSelector: '.popup__form'});

editProfileDataValidation.enableValidation();
editProfileAvatarValidation.enableValidation();
addValidation.enableValidation();

const userData = new UserInfo({
  userNameSelector: '.profile__user-name',
  userAboutSelector: '.profile__about-user',
  userAvatarSelector: '.profile__image'},
  null);

const userProfile = api.getProfileData();

userProfile.then((profileData) => {
  userData.userId  = profileData._id;

  userData.setUserInfo({userName: profileData.name, userAbout: profileData.about, userAvatar: profileData.avatar});

  const initialCards = api.getAllCards().then((dataCards) => {
    const cards = dataCards.map(card => {
      return {name: card.name,
        link: card.link,
        likes: card.likes,
        owner: card.owner,
        cardId: card._id,
        createdAt: card.createdAt};
    });
    cards.sort((j, k) => Date.parse(j.createdAt) - Date.parse(k.createdAt));
    cards.forEach((card) => {
      if (userData.userId == card.ownerId) {
        card.removable = true;
      } else {
        card.removable = false;
      }
    });

    return cards;
  }).catch(err => alert(err));

  return initialCards;

}).then((initialCards) => {

  const gallery =  new Section({ items: initialCards, renderer: renderer},
    '.cards__container');

  const imagePopup = new PopupWithImage('.popup_type_img');
  const confirmDeletingCardPopup = new PopupWithSubmit('.popup_type_confirm');

  function renderer(data) {
    const newCard = new Card({
        url: data.link, name: data.name, likes: data.likes, owner: data.owner, id: data.cardId,
        userId: userData.userId},
      {
        handleCardClick: () => imagePopup.open({name: data.name, url: data.link}),
        handleDeleteIconClick: (removeCard) => {
          confirmDeletingCardPopup.setSubmitAction(() => {
            api.deleteCard(data.cardId).then(() => {
              removeCard();
              confirmDeletingCardPopup.close();
            }).catch(err => alert(err));
          });
          confirmDeletingCardPopup.open();
        },
        handleLikeClick: (isLiked, toggleLike) => {
          if(!isLiked) {
            api.putLike(data.cardId).then((cardData) => {
              toggleLike();
              newCard.changeLikeState();
              newCard.updateLikesData(cardData);
              newCard.setNumberOfLikes();
            }).catch(err => alert(err));
          } else {
            api.deleteLike(data.cardId).then((cardData) => {
              toggleLike();
              newCard.changeLikeState();
              newCard.updateLikesData(cardData);
              newCard.setNumberOfLikes();
            }).catch(err => alert(err));
          }
        } },
      data.owner._id == userData.userId ? '.removable-card-template' : '.card-template');

    const cardElement = newCard.getCard();
    newCard.checkLikeState();

    gallery.addItem(cardElement);
  }

  const editedAvatarPopup = new PopupWithForm(
    { popupSelector: '.popup_type_change-avatar',
      formSubmit: (inputValues) => {
        const link = inputValues['avatar-url'];
        api.patchProfileAvatar(link).then((data) => {
          userData.setUserInfo({userName: data.name, userAbout: data.about, userAvatar: data.avatar});
          editedAvatarPopup.close();
        }).catch(err => alert(err)).finally(() => editedAvatarPopup.renderLoading(false));
      }
    }
  );
  const editedPopup = new PopupWithForm(
    { popupSelector: '.popup_type_edit-user-data',
      formSubmit: (inputValues) => {
        api.patchProfileData({name: inputValues['user-name'], about: inputValues['user-about']})
          .then((data) => {
            userData.setUserInfo({userName: data.name, userAbout: data.about, userAvatar: data.avatar});
            editedPopup.close();
          }).catch(err => alert(err)).finally(() => editedPopup.renderLoading(false));
      }
    });
  editProfileDataValidation.enableSubmitBtn();
  const addedPopup = new PopupWithForm(
    { popupSelector: '.popup_type_add-card',
      formSubmit: (inputValues) => {
        api.postCard({name: inputValues['place-name'], link: inputValues['place-url']}).then((card) => {
          renderer({name: card.name, link: card.link, likes: card.likes, cardId: card._id, owner: card.owner});
          addedPopup.close();
        }).catch(err => alert(err)).finally(() => addedPopup.renderLoading(false));
    }
    });

  editedPopup.setEventListeners();
  editedAvatarPopup.setEventListeners();
  addedPopup.setEventListeners();
  imagePopup.setEventListeners();
  confirmDeletingCardPopup.setEventListeners();

  editBtn.addEventListener('mousedown', () => {
    const data = userData.getUserInfo();

    userName.value = data.userName;
    userAbout.value = data.userAbout;

    editedPopup.open();
  });

  editAvatarBtn.addEventListener('mousedown', () => {
    editProfileAvatarValidation.disableSubmitBtn();
    editedAvatarPopup.open();
  });

  addBtn.addEventListener('mousedown', () => {
    addValidation.disableSubmitBtn();
    addedPopup.open();
  });

  gallery.renderItems();

}).catch(err => {
  alert(err);
  console.log(err);
});





