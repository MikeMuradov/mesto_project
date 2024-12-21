/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/

;// ./src/images/avatar.jpg
const avatar_namespaceObject = __webpack_require__.p + "6666407ac3aa5af1d5de.jpg";
;// ./src/images/logo.svg
const logo_namespaceObject = __webpack_require__.p + "fc3e6875d825f899a98d.svg";
;// ./src/components/validation.js
enableValidation();

function showInputError(formElement, inputElement, errorMessage) {
  var errorElement = formElement.querySelector("#".concat(inputElement.id, "-error"));
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}
function hideInputError(formElement, inputElement) {
  var errorElement = formElement.querySelector("#".concat(inputElement.id, "-error"));
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__error_visible');
}
function toggleButtonState(inputs, submitButton) {
  var isValid = inputs.every(function (input) {
    return input.validity.valid;
  });
  if (!isValid) {
    submitButton.disabled = true;
    submitButton.classList.add('popup__button_disabled');
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove('popup__button_disabled');
  }
}
function setEventListeners(formElement) {
  var buttonElement = formElement.querySelector('.popup__button');
  var inputs = Array.from(formElement.querySelectorAll('.popup__input'));
  toggleButtonState(inputs, buttonElement);
  inputs.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
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
  var forms = Array.from(document.querySelectorAll('.popup__form'));
  forms.forEach(function (formElement) {
    setEventListeners(formElement);
  });
}
;// ./src/components/modal.js

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
    var openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
function openPopup(popup) {
  var errorMessages = popup.querySelectorAll('.popup__error');
  var inputs = Array.from(popup.querySelectorAll('.popup__input'));
  var submitButton = popup.querySelector('.popup__button');
  popup.classList.add('popup_is-opened');
  errorMessages.forEach(function (errorElement) {
    errorElement.textContent = '';
  });
  inputs.forEach(function (input) {
    input.classList.remove('popup__input_type_error');
  });
  if (submitButton) {
    toggleButtonState(inputs, submitButton);
  }
  document.addEventListener('keydown', closeEsc);
  popup.addEventListener('mousedown', handleOverlay);
}

;// ./src/components/api.js
var apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
  headers: {
    authorization: '39891fa3-fd67-4433-bd27-fa2dc048d2b2',
    'Content-Type': 'application/json'
  }
};
var setAuthToken = function setAuthToken(token) {
  apiConfig.headers.authorization = "Bearer ".concat(token);
};
var handleResponse = function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(response.status, " - ").concat(response.statusText));
};
var updateUserProfileData = function updateUserProfileData(profileData) {
  return fetch("".concat(apiConfig.baseUrl, "/users/me"), {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(profileData)
  }).then(handleResponse);
};
var createNewCardData = function createNewCardData(cardInfo) {
  return fetch("".concat(apiConfig.baseUrl, "/cards"), {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(cardInfo)
  }).then(handleResponse);
};
var fetchInitialCardsData = function fetchInitialCardsData() {
  return fetch("".concat(apiConfig.baseUrl, "/cards"), {
    headers: apiConfig.headers
  }).then(handleResponse);
};
var fetchUserProfileData = function fetchUserProfileData() {
  return fetch("".concat(apiConfig.baseUrl, "/users/me"), {
    headers: apiConfig.headers
  }).then(handleResponse);
};
var removeCardData = function removeCardData(cardId) {
  return fetch("".concat(apiConfig.baseUrl, "/cards/").concat(cardId), {
    method: 'DELETE',
    headers: apiConfig.headers
  }).then(handleResponse);
};
var addLikeToCardData = function addLikeToCardData(cardId) {
  return fetch("".concat(apiConfig.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'PUT',
    headers: apiConfig.headers
  }).then(handleResponse);
};
var removeLikeFromCardData = function removeLikeFromCardData(cardId) {
  return fetch("".concat(apiConfig.baseUrl, "/cards/likes/").concat(cardId), {
    method: 'DELETE',
    headers: apiConfig.headers
  }).then(handleResponse);
};
var updateUserAvatarData = function updateUserAvatarData(newAvatarUrl) {
  return fetch("".concat(apiConfig.baseUrl, "/users/me/avatar"), {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: newAvatarUrl
    })
  }).then(handleResponse);
};
;// ./src/components/cards.js


imageViewPopup;

var imageViewPopup = document.querySelector('.popup_type_image');
function generateCard(cardData, loggedInUserId) {
  var template = document.querySelector('#card-template').content;
  var cardElement = template.querySelector('.card').cloneNode(true);
  var cardImage = cardElement.querySelector('.card__image');
  var cardTitle = cardElement.querySelector('.card__title');
  var likeButton = cardElement.querySelector('.card__like-button');
  var likeCount = cardElement.querySelector('.card__like-count');
  var deleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;
  if (cardData.likes.some(function (user) {
    return user._id === loggedInUserId;
  })) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', function () {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      removeLikeFromCardData(cardData._id).then(function (updatedCard) {
        likeButton.classList.remove('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      }).catch(function (err) {
        console.error('Ошибка при снятии лайка:', err);
      });
    } else {
      addLikeToCardData(cardData._id).then(function (updatedCard) {
        likeButton.classList.add('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      }).catch(function (err) {
        console.error('Ошибка при постановке лайка:', err);
      });
    }
  });
  if (cardData.owner._id !== loggedInUserId) {
    deleteButton.style.display = 'none';
  }
  deleteButton.addEventListener('click', function () {
    removeCardData(cardData._id).then(function () {
      cardElement.remove();
    }).catch(function (err) {
      console.error('Ошибка при удалении карточки:', err);
    });
  });
  cardImage.addEventListener('click', function () {
    var popupImage = imageViewPopup.querySelector('.popup__image');
    var popupCaption = imageViewPopup.querySelector('.popup__caption');
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openPopup(imageViewPopup);
  });
  return cardElement;
}
;// ./src/components/index.js







var avatarImageElement = document.querySelector('.profile__image');
avatarImageElement.style.backgroundImage = "url(".concat(avatar_namespaceObject, ")");
var siteLogoElement = document.querySelector('.header__logo');
siteLogoElement.src = logo_namespaceObject;
var profileTitleElement = document.querySelector('.profile__title');
var profileDescElement = document.querySelector('.profile__description');
var profileAvatarImgElement = document.querySelector('.profile__image');
var cardContainer = document.querySelector('.places__list');
var editProfilePopup = document.querySelector('.popup_type_edit');
var addCardPopup = document.querySelector('.popup_type_new-card');
var components_imageViewPopup = document.querySelector('.popup_type_image');
var closePopupButtons = document.querySelectorAll('.popup__close');
var editProfileButton = document.querySelector('.profile__edit-button');
var profileEditForm = editProfilePopup.querySelector('.popup__form');
var nameInputField = editProfilePopup.querySelector('.popup__input_type_name');
var jobInputField = editProfilePopup.querySelector('.popup__input_type_description');
var addNewCardButton = document.querySelector('.profile__add-button');
var newCardForm = addCardPopup.querySelector('.popup__form');
var cardTitleInput = addCardPopup.querySelector('.popup__input_type_card-name');
var cardLinkInput = addCardPopup.querySelector('.popup__input_type_url');
var updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
var avatarForm = updateAvatarPopup.querySelector('.popup__form');
var avatarUrlInput = avatarForm.querySelector('.popup__input_type_avatar-url');
var loggedInUserId = null;
fetchUserProfileData().then(function (userData) {
  profileTitleElement.textContent = userData.name;
  profileDescElement.textContent = userData.about;
  profileAvatarImgElement.style.backgroundImage = "url(".concat(userData.avatar, ")");
  loggedInUserId = userData._id; // Сохраняем ID текущего пользователя
}).catch(function (err) {
  console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F: ".concat(err));
});
fetchInitialCardsData().then(function (cards) {
  displayCards(cards);
}).catch(function (err) {
  console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A: ".concat(err));
});
editProfileButton.addEventListener('click', function () {
  nameInputField.value = profileTitleElement.textContent;
  jobInputField.value = profileDescElement.textContent;
  openPopup(editProfilePopup);
});
closePopupButtons.forEach(function (button) {
  button.addEventListener('click', function (event) {
    var popup = event.target.closest('.popup');
    closePopup(popup);
  });
});
profileEditForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  var updatedUserData = {
    name: nameInputField.value,
    about: jobInputField.value
  };
  updateUserProfileData(updatedUserData).then(function (userData) {
    profileTitleElement.textContent = userData.name;
    profileDescElement.textContent = userData.about;
    closePopup(editProfilePopup);
  }).catch(function (err) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0444\u0438\u043B\u044F: ".concat(err));
  }).finally(function () {
    submitButton.textContent = 'Сохранить';
  });
});
addNewCardButton.addEventListener('click', function () {
  cardTitleInput.value = '';
  cardLinkInput.value = '';
  openPopup(addCardPopup);
});
newCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var submitButton = evt.submitter;
  submitButton.textContent = 'Создание...';
  var newCardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value
  };
  createNewCardData(newCardData).then(function (cardData) {
    var newCard = generateCard(cardData, loggedInUserId);
    cardContainer.prepend(newCard);
    closePopup(addCardPopup);
  }).catch(function (err) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438: ".concat(err));
  }).finally(function () {
    submitButton.textContent = 'Создать';
  });
});
profileAvatarImgElement.addEventListener('click', function () {
  openPopup(updateAvatarPopup);
});
avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  var avatarUrl = avatarUrlInput.value;
  updateUserAvatarData(avatarUrl).then(function (userData) {
    profileAvatarImgElement.style.backgroundImage = "url(".concat(userData.avatar, ")");
    closePopup(updateAvatarPopup);
    avatarForm.reset();
  }).catch(function (err) {
    console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0430\u0432\u0430\u0442\u0430\u0440\u0430: ".concat(err));
  }).finally(function () {
    submitButton.textContent = 'Сохранить';
  });
});
function displayCards(cards) {
  cards.forEach(function (cardData) {
    var cardElement = generateCard(cardData, loggedInUserId);
    cardContainer.append(cardElement);
  });
}
/******/ })()
;