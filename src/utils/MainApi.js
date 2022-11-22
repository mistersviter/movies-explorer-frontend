class MainApi {
  constructor(baseURL, headers) {
    this._baseURL = baseURL;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  registerNewUser = (data) => {
    const { email, password, name } = data;
    return fetch(`${this._baseURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then(this._handleResponse);
  };

  login = (data) => {
    const { email, password } = data;
    return fetch(`${this._baseURL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleResponse);
  };

  getUserInfo = () => {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
    }).then(this._handleResponse);
  };

  updatetUserInfo = (data) => {
    const { name, email } = data;
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
      credentials: 'include',
    }).then(this._handleResponse);
  };

  saveMovie = (movie) => {
    return fetch(`${this._baseURL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
      body: JSON.stringify(movie),
    }).then(this._handleResponse);
  };

  deleteMovie = (_id) => {
    return fetch(`${this._baseURL}/movies/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
    }).then(this._handleResponse);
  };

  getSavedMovies = () => {
    return fetch(`${this._baseURL}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
    }).then(this._handleResponse);
  };
}

const mainApi = new MainApi('https://api.movies-exp.nomoredomains.club');

export default mainApi;
