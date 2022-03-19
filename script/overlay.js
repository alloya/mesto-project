

const main = document.querySelector('.main');

function closePopup(evt) {
    evt.target.classList.remove('popup_opened');
}

main.addEventListener('mousedown', closePopup);
main.addEventListener('keydown', (evt) => {
    const overlay = document.querySelector('.popup_opened');
    if ((evt.key === 'Escape') && overlay) {
        overlay.classList.remove('popup_opened');
    }
})
