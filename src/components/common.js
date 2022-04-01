import { btnText, formElements, loadingBar, main } from "./const";

export function setVisible(element) {
  element.classList.remove('d-none');
}

export function setInvisible(element) {
  element.classList.add('d-none');
}

export function setButtonBlockedState(btn) {
  disableButton(btn);
  btn.textContent = btnText.saving;
}

export function resetButtonText(btn, text) {
  btn.textContent = text;
  enableButton(btn);
}

export function disableButton(btn) {
  btn.classList.add(formElements.buttonInactive);
  btn.setAttribute('disabled', '');
}

export function enableButton(btn) {
  btn.classList.remove(formElements.buttonInactive);
  btn.removeAttribute('disabled', '');
}