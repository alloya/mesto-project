import { loadingBar } from "./const";

export function setMainVisible() {
  const main = document.querySelector('.main');
  main.classList.remove('d-none');
}

export function hideLoadingBar() {
  loadingBar.classList.add('d-none');
}
