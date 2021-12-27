import { mainApiOptions } from "./utils";

class MainApi {
  constructor(config) {
    this._baseUrl = config.url;
    this._headers = config.headers;
  }

  setToken(token) {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    }
  }

  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  updateUserInfo(data) {
    const { email, name } = data;

    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    }).then((res) => this._handlePromise(res));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  createMovie(data) {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      id,
      nameRU,
      nameEN,
    } = data;

    const finalCountry =
      country === null
        ? "Неизвестно"
        : country.length > 30
          ? country.slice(0, 30)
          : country;

    const finalDirector =
      director === null
        ? "Неизвестно"
        : director.length > 30
          ? director.slice(0, 30)
          : director;

    const imageUrl = `https://api.nomoreparties.co${image.url}`;
    const thumbnail = `https://api.nomoreparties.co${image.formats.thumbnail.url}`;

    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: finalCountry,
        director: finalDirector,
        duration: duration,
        year: year,
        description: description,
        image: imageUrl,
        trailer: trailerLink,
        movieId: id,
        nameRU: nameRU,
        nameEN: nameEN,
        thumbnail: thumbnail,
      }),
    }).then((res) => this._handlePromise(res));
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  register(data) {
    const { email, password, name } = data;

    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then((res) => this._handlePromise(res));
  }

  login(data) {
    const { email, password } = data;

    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => this._handlePromise(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }
}

const mainApi = new MainApi(mainApiOptions);

export default mainApi;
