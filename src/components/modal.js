import { toggleButtonState } from './validation.js';


function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
  popup.removeEventListener('mousedown', handleOverlay);
}
function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function closeEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
function openPopup(popup) {
  const errorMessages = popup.querySelectorAll('.popup__error');
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  const submitButton = popup.querySelector('.popup__button');
  popup.classList.add('popup_is-opened');
  errorMessages.forEach((errorElement) => {
    errorElement.textContent = '';
  });
  inputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  });
  if (submitButton) {
    toggleButtonState(inputs, submitButton);
  }
  document.addEventListener('keydown', closeEsc);
  popup.addEventListener('mousedown', handleOverlay);
}



export { openPopup, closePopup };
