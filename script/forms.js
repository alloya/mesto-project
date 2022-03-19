const formsList = document.querySelectorAll('.form');
const avatarForm = document.querySelector('.form-avatar');
const avatarFormInput = document.querySelector('.form__input');
const avatarError = document.querySelector(`.${avatarFormInput.id}-error`);

avatarForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
})

avatarFormInput.addEventListener('input', function(evt) {
    checkValidity();    
})

const showError = (input, errorMessage) => {
    input.classList.add('form__input_type_error');
    avatarError.textContent = errorMessage;
    avatarError.classList.add('form__input-error_active');
};
  
  const hideError = (input) => {
    input.classList.remove('form__input_type_error');
    avatarError.classList.remove('form__input-error_active');
    avatarError.textContent = '';
  };

  const checkValidity = () => {
      if (avatarFormInput.validity.valid) {
          hideError(avatarFormInput);
      }
      else {
          console.log(avatarFormInput.validationMessage)
          showError(avatarFormInput, avatarFormInput.validationMessage);
      }
  }
