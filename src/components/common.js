import { loadingBar, main } from "./const";

export function setVisible(element) {
  element.classList.remove('d-none');
}

export function setInvisible(element) {
  element.classList.add('d-none');
}

export function flashMain(){
  setInvisible(main);
  setVisible(main);
}