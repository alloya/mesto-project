import { btnText, errorText, formElements } from "./const";
import {errorPopup} from "../index";

export function setVisible(element) {
  element.classList.remove('d-none');
}

export function setInvisible(element) {
  element.classList.add('d-none');
}

// export function setButtonBlockedState(btn) {
//   disableButton(btn);
//   btn.textContent = btnText.saving;
// }

// export function resetButtonText(btn, text) {
//   btn.textContent = text;
//   enableButton(btn);
// }

export function disableButton(btn) {
  btn.classList.add(formElements.buttonInactive);
  btn.setAttribute('disabled', '');
}

export function enableButton(btn) {
  btn.classList.remove(formElements.buttonInactive);
  btn.removeAttribute('disabled', '');
}

export function handleError(err) {
  console.log(err && err.message || err)
  errorText.textContent = err && err.message || err;
  errorPopup.open();
  setTimeout(() => {errorPopup.close()}, 2000);
}