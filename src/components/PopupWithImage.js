import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
  }

  open = (card) => {
    const _image = this._popupSelector.querySelector('.card__full-picture');
    const _title = this._popupSelector.querySelector('.card__full-subtitle');
    _image.setAttribute('src', card.url);
    _image.setAttribute('alt', card.name);
    _title.textContent = card.name;
    super.open();
  }
}