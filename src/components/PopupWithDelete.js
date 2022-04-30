import Popup from "./Popup";
import {api} from "../index";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, submitCallback) {
    debugger
    super(popupSelector);
    //this._card = card;
    //this._deleteButton = this._popup.querySelector('.popup__button-save');
    this._submitCallback = submitCallback;
  }

  open() {
    super.open();
    this._card = card;
    this.setEventListeners();
  }

  // setEventListeners() {
  //   super.setEventListeners();
  //   this._deleteButton.addEventListener('click', ()=>{
  //     api.deleteCard(this.card.getCardId())
  //       .then(()=> this.card.deleteCard())
  //       .catch (err => console.log(err))
  //       .finally(this.close())
  //   })
  // }

  _handleDelete = evt => {
    evt.preventDefault();
    this._submitCallback(this._card.getCardId());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._handleDelete);
  }

  close() {
    super.close();
    this._popup.removeEventListener('submit', this._handleDelete);
  }
}