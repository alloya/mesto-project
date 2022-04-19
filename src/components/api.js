export const auth = { token: '100a0a32-f941-4db8-a158-a769d9d537de', apiUrl: 'https://nomoreparties.co/v1/plus-cohort-8' };
export default class Api {
  constructor(auth) {
    this._url = auth.apiUrl;
    this._token = auth.token;
  }

  _handleResponse(res) {  
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse);
  }

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse);
  }

  updateCurrentUser(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._handleResponse);
  }

  updateCurrentUserAvatar(avatarSrc) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarSrc
      })
    })
      .then(this._handleResponse);
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse);
  }

  createNewCard(cardName, cardLink) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
      .then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse);
  }
}






// function handleResponse(res) {
//   if (!res.ok) {
//     return Promise.reject(`Ошибка: ${res.status}`);
//   }
//   return res.json();
// }

// export function getCards() {
//   return fetch(`${auth.apiUrl}/cards`, {
//     headers: {
//       authorization: auth.token
//     }
//   })
//     .then(handleResponse);
// }

// export function getCurrentUser() {
//   return fetch(`${auth.apiUrl}/users/me`, {
//     headers: {
//       authorization: auth.token
//     }
//   })
//     .then(handleResponse);
// }

// export function updateCurrentUser(name, about) {
//   return fetch(`${auth.apiUrl}/users/me`, {
//     method: "PATCH",
//     headers: {
//       authorization: auth.token,
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: name,
//       about: about
//     })
//   })
//     .then(handleResponse);
// }

// export function updateCurrentUserAvatar(avatarSrc) {
//   return fetch(`${auth.apiUrl}/users/me/avatar`, {
//     method: "PATCH",
//     headers: {
//       authorization: auth.token,
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       avatar: avatarSrc
//     })
//   })
//     .then(handleResponse);
// }

// export function putLike(cardId) {
//   return fetch(`${auth.apiUrl}/cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: {
//       authorization: auth.token
//     }
//   })
//     .then(handleResponse);
// }

// export function deleteLike(cardId) {
//   return fetch(`${auth.apiUrl}/cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: {
//       authorization: auth.token
//     }
//   })
//     .then(handleResponse);
// }

// export function createNewCard(cardName, cardLink) {
//   return fetch(`${auth.apiUrl}/cards`, {
//     method: "POST",
//     headers: {
//       authorization: auth.token,
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: cardName,
//       link: cardLink
//     })
//   })
//     .then(handleResponse);
// }

// export function deleteCard(cardId) {
//   return fetch(`${auth.apiUrl}/cards/${cardId}`, {
//     method: "DELETE",
//     headers: {
//       authorization: auth.token
//     }
//   })
//     .then(handleResponse);
// }