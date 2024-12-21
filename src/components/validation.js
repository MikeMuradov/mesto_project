
enableValidation();
export { toggleButtonState };




function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}


function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__error_visible');
}

function toggleButtonState(inputs, submitButton) {
  const isValid = inputs.every((input) => input.validity.valid);
  if (!isValid) {
     submitButton.disabled = true;
     submitButton.classList.add('popup__button_disabled');
  } else {
     submitButton.disabled = false;
     submitButton.classList.remove('popup__button_disabled');
  }
}

function setEventListeners(formElement) {
  const buttonElement = formElement.querySelector('.popup__button');
  const inputs = Array.from(formElement.querySelectorAll('.popup__input'));
  toggleButtonState(inputs, buttonElement);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputs, buttonElement);
    });
  });
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
}


function enableValidation() {
  const forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach((formElement) => {
    setEventListeners(formElement);
  });
}


