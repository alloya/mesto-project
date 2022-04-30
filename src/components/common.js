import { btnText, errorPopup, errorText, formElements } from "./const";

export default class Extensions {
  constructor(){   
  }

  setVisible(element) {
    element.classList.remove('d-none');
  }
  
  setInvisible(element) {
    element.classList.add('d-none');
  }
  
  setButtonBlockedState(btn) {
    disableButton(btn);
    btn.textContent = btnText.saving;
  }
  
  resetButtonText(btn, text) {
    btn.textContent = text;
    enableButton(btn);
  }
  
  disableButton(btn) {
    btn.classList.add(formElements.buttonInactive);
    btn.setAttribute('disabled', '');
  }
  
  enableButton(btn) {
    btn.classList.remove(formElements.buttonInactive);
    btn.removeAttribute('disabled', '');
  }
  
  handleError(err) {
    console.log(err.message || err)
    errorText.textContent = err && err.message || err;
    errorPopup.open();
    setTimeout(() => {errorPopup.close()}, 2000);
  }
}

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
  console.log(err.message || err)
  errorText.textContent = err && err.message || err;
  errorPopup.open();
  setTimeout(() => {errorPopup.close()}, 2000);
}