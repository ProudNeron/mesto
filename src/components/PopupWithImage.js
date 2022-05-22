import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor({popupSelector, ... arr}, {imgSelector, titleSelector}) {
    super({popupSelector, ... arr});
    this._imgSelectors = {img: imgSelector, title: titleSelector};
  }

  open({name, url}) {
    const imgElement = document.querySelector(this._imgSelectors.img);

    imgElement.src = url;
    imgElement.alt = name;

    document.querySelector(this._imgSelectors.title).textContent = name;

    super.open();
  }
}
