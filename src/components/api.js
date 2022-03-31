export const auth = {token: '100a0a32-f941-4db8-a158-a769d9d537de', groupId: 'plus-cohort-8', apiUrl: 'https://nomoreparties.co/v1/'};

export function getCards() {
  return fetch(`${auth.apiUrl}${auth.groupId}/cards`, {
    headers: {
      authorization: auth.token
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function getCurrentUser() {
  return fetch(`${auth.apiUrl}${auth.groupId}/users/me`, {
    headers: {
      authorization: auth.token
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function putLike(cardId) {
  return fetch(`${auth.apiUrl}${auth.groupId}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: auth.token
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function deleteLike(cardId) {
  return fetch(`${auth.apiUrl}${auth.groupId}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: auth.token
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}