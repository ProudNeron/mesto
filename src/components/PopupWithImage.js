import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._imgElement = this._popup.querySelector('.popup__image');
    this._imgTitle = this._popup.querySelector('.popup__image-caption');
  }

  open({name, url}) {
    this._imgElement.src = url;
    this._imgElement.alt = name;
    this._imgTitle.textContent = name;
    super.open();
  }
}
