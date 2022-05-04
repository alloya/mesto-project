import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popup = popup;
  }

  open = (card) => {
    const _image = this._popup.querySelector('.card__full-picture');
    const _title = this._popup.querySelector('.card__full-subtitle');
    _image.setAttribute('src', card.url);
    _image.setAttribute('alt', card.name);
    _title.textContent = card.name;
    super.open();
  }
}