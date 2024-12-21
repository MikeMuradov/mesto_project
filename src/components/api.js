const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
  headers: {
    authorization: '39891fa3-fd67-4433-bd27-fa2dc048d2b2',
    'Content-Type': 'application/json',
  },
};


export const setAuthToken = (token) => {
  apiConfig.headers.authorization = `Bearer ${token}`;
};

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status} - ${response.statusText}`);
};


export const updateUserProfileData = (profileData) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(profileData),
  }).then(handleResponse);
};

export const createNewCardData = (cardInfo) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(cardInfo),
  }).then(handleResponse);
};
export const fetchInitialCardsData = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, { headers: apiConfig.headers }).then(handleResponse);
};
export const fetchUserProfileData = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, { headers: apiConfig.headers }).then(handleResponse);
};
export const removeCardData = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then(handleResponse);
};

export const addLikeToCardData = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  }).then(handleResponse);
};

export const removeLikeFromCardData = (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then(handleResponse);
};

export const updateUserAvatarData = (newAvatarUrl) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({ avatar: newAvatarUrl }),
  }).then(handleResponse);
};
