export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handlePopupOverlayClick = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    const closePopupButton = this._popup.querySelector('.popup__close');
    closePopupButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', this._handlePopupOverlayClick)
  }
}