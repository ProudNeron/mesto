class Card {
  constructor(data, btnSelectors, btnStyleModClasses, openPopup, templateSelector) {
    this._templateSelector = templateSelector;
    this._imageData = { url: data.cardImageUrl, selector: data.imageSelector};
    this._titleData = {name: data.cardName, selector: data.nameSelector};
    this._btnSelectors = {delete: btnSelectors.deleteBtn, like: btnSelectors.likeBtn};
    this._btnStyleModClasses = {activeLikeBtn: btnStyleModClasses.likeBtn};
    this._openPopup = openPopup;
  }

  _toggleLike() {
    this._likeBtn.classList.toggle(this._btnStyleModClasses.activeLikeBtn);
  }

  _removeCard() {
    this._element.remove();
  }

  _fillCard() {
    this._cardImage.src = this._imageData.url;
    this._cardImage.alt = this._titleData.name;
    this._cardName.textContent = this._titleData.name;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', this._toggleLike.bind(this));
    this._deleteBtn.addEventListener('click', this._removeCard.bind(this));
    this._cardImage.addEventListener('click', () => {this._openPopup(this._titleData.name, this._imageData.url)});
  }

  _getTemplate() {
    return document.querySelector('.card-template').
      content.querySelector(this._templateSelector).cloneNode(true);
  }

  getCard() {
    this._element = this._getTemplate();

    this._likeBtn = this._element.querySelector(this._btnSelectors.like);
    this._deleteBtn = this._element.querySelector(this._btnSelectors.delete);

    this._cardImage = this._element.querySelector(this._imageData.selector);
    this._cardName = this._element.querySelector(this._titleData.selector);

    this._fillCard();
    this._setEventListeners();

    return this._element;
  }
}

export {Card};

