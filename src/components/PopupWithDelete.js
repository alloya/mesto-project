import Popup from "./Popup";
import {api} from "../index";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleDelete){
    super(popupSelector);
    this._deleteButton = this._popup.querySelector('.popup__button-save');
    this._handleDelete = handleDelete;
  }

  open(card) {
    super.open();
    this.card = card;
    this.setEventListeners();
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', ()=>{
      api.deleteCard(this.card.getCardId())
        .then(()=> this.card.deleteCard())
        .catch (err => console.log(err))
        .finally(this.close())
    })
  }
}