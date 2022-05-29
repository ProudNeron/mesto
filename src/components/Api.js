export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.statusMessage);
  }

  getAllCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(res => this._checkServerResponse(res));
  }

  postCard({name, link}) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {authorization: this._headers.authorization,
        'Content-type': 'application/json'},
      body: JSON.stringify({name: name, link: link})
    }).then(res => this._checkServerResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._checkServerResponse(res));
  }

  getProfileData() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(res => this._checkServerResponse(res));
  }

  patchProfileData({name, about}) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {authorization: this._headers.authorization,
      'Content-type': 'application/json'},
      body: JSON.stringify({name: name, about: about})
    }).then((res) => this._checkServerResponse(res));
  }

  patchProfileAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {authorization: this._headers.authorization,
        'Content-type': 'application/json'},
      body: JSON.stringify({avatar: link})
    }).then((res) => this._checkServerResponse(res));
  }

  putLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => this._checkServerResponse(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._checkServerResponse(res));
  }
}
