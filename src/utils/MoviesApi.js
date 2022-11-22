class MoviesApi {
  constructor(baseURL, headers) {
    this._baseURL = baseURL;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getMovies = () => {
    return fetch(`${this._baseURL}/beatfilm-movies`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(this._handleResponse);
  };
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co');
export default moviesApi;