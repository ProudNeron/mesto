export default class Card {
  constructor(data, {handleCardClick, handleLikeClick, handleDeleteIconClick}, templateSelector) {
    this._templateSelector = templateSelector;
    this._data = {url: data.url, name: data.name, likes: data.likes, owner: data.owner};
    this._openPopup = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;

    this.userId = data.userId;
    this.id = data.id;

    this._removable = this._templateSelector == '.removable-card-template' ? true : false;
    this.isLiked = false;
    this._data.likes.forEach((item) => {
      if (item._id == this.userId) {
        this.isLiked = true;
      }
    })
  }

  _remove() {
    this._element.remove();
  }

  _putLike() {
    this._likeBtn.classList.add('card__like-button_active');
  }

  _deleteLike() {
    this._likeBtn.classList.remove('card__like-button_active');
  }

  _countLikes() {
    return this._data.likes.length;
  }

  updateLikesData(data) {
    this._data.likes = data.likes;
  }

  checkLikeState() {
    if (this.isLiked) {
      this._putLike();
    } else {
      this._deleteLike();
    }
  }

  changeLikeState() {
    this.isLiked = !this.isLiked;
  }

  setNumberOfLikes() {
    this._element.querySelector('.card__like-counter').textContent = `${this._countLikes()}`;
  }

  _toggleLike() {
    this._likeBtn.classList.toggle('card__like-button_active');
  }

  _fillCard() {
    this._cardImage.src = this._data.url;
    this._cardImage.alt = this._data.name;
    this._cardName.textContent = this._data.name;
    this.setNumberOfLikes();
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeClick(this.isLiked, this._toggleLike.bind(this));
    });
    this._cardImage.addEventListener('click', () => {
      this._openPopup({name: this._data.name, about: this._data.url});
    });

    if (this._removable) {
      this._deleteBtn.addEventListener('click', () => {
        this._handleDeleteIconClick(this._remove.bind(this));
      });
    }
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).
      content.querySelector('.card').cloneNode(true);
  }

  getCard() {
    this._element = this._getTemplate();


    if(this._removable) {
      this._deleteBtn = this._element.querySelector('.card__delete-btn');
    }
    this._likeBtn = this._element.querySelector('.card__like-button');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardName = this._element.querySelector('.card__title');

    this._fillCard();
    this._setEventListeners();

    return this._element;
  }
}

