import userAvatarImage from '../images/avatar.jpg';
import siteLogoImage from '../images/logo.svg';
import '../pages/index.css';
import { toggleButtonState } from './validation.js';
import { openPopup, closePopup } from './modal.js';
import {generateCard} from './cards.js';

import {
  fetchUserProfileData,
  fetchInitialCardsData,
  updateUserProfileData,
  createNewCardData,
  removeCardData,
  addLikeToCardData,
  removeLikeFromCardData,
  updateUserAvatarData,
} from './api.js';

const avatarImageElement = document.querySelector('.profile__image');
avatarImageElement.style.backgroundImage = `url(${userAvatarImage})`;
const siteLogoElement = document.querySelector('.header__logo');
siteLogoElement.src = siteLogoImage;
const profileTitleElement = document.querySelector('.profile__title');
const profileDescElement = document.querySelector('.profile__description');
const profileAvatarImgElement = document.querySelector('.profile__image');
const cardContainer = document.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imageViewPopup = document.querySelector('.popup_type_image');
const closePopupButtons = document.querySelectorAll('.popup__close');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileEditForm = editProfilePopup.querySelector('.popup__form');
const nameInputField = editProfilePopup.querySelector('.popup__input_type_name');
const jobInputField = editProfilePopup.querySelector('.popup__input_type_description');
const addNewCardButton = document.querySelector('.profile__add-button');
const newCardForm = addCardPopup.querySelector('.popup__form');
const cardTitleInput = addCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardPopup.querySelector('.popup__input_type_url');
const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
const avatarForm = updateAvatarPopup.querySelector('.popup__form');
const avatarUrlInput = avatarForm.querySelector('.popup__input_type_avatar-url');

let loggedInUserId = null;


fetchUserProfileData()
  .then((userData) => {
    profileTitleElement.textContent = userData.name;
    profileDescElement.textContent = userData.about;
    profileAvatarImgElement.style.backgroundImage = `url(${userData.avatar})`;
    loggedInUserId = userData._id; // Сохраняем ID текущего пользователя
  })
  .catch((err) => {
    console.error(`Ошибка загрузки профиля: ${err}`);
  });


fetchInitialCardsData()
  .then((cards) => {
    displayCards(cards);
  })
  .catch((err) => {
    console.error(`Ошибка загрузки карточек: ${err}`);
  });

editProfileButton.addEventListener('click', () => {
  nameInputField.value = profileTitleElement.textContent;
  jobInputField.value = profileDescElement.textContent;
  openPopup(editProfilePopup);
});


closePopupButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  });
});

profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';

  const updatedUserData = { name: nameInputField.value, about: jobInputField.value };
  updateUserProfileData(updatedUserData)
    .then((userData) => {
      profileTitleElement.textContent = userData.name;
      profileDescElement.textContent = userData.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.error(`Ошибка обновления профиля: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

addNewCardButton.addEventListener('click', () => {
  cardTitleInput.value = '';
  cardLinkInput.value = '';
  openPopup(addCardPopup);
});

newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Создание...';

  const newCardData = { name: cardTitleInput.value, link: cardLinkInput.value };
  createNewCardData(newCardData)
    .then((cardData) => {
      const newCard = generateCard(cardData, loggedInUserId);
      cardContainer.prepend(newCard);
      closePopup(addCardPopup);
    })
    .catch((err) => {
      console.error(`Ошибка добавления карточки: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Создать';
    });
});

profileAvatarImgElement.addEventListener('click', () => {
  openPopup(updateAvatarPopup);
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const submitButton = evt.submitter;
  submitButton.textContent = 'Сохранение...';
  const avatarUrl = avatarUrlInput.value;
  updateUserAvatarData(avatarUrl)
    .then((userData) => {
      profileAvatarImgElement.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(updateAvatarPopup);
      avatarForm.reset();
    })
    .catch((err) => {
      console.error(`Ошибка обновления аватара: ${err}`);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
    });
});

function displayCards(cards) {
  cards.forEach((cardData) => {
    const cardElement = generateCard(cardData, loggedInUserId);
    cardContainer.append(cardElement);
  });
}
