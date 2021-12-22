import { moviesApiOptions } from "./utils";

class MoviesApi {
  constructor(config) {
    this._baseUrl = config.url;
    this._headers = config._headers;
  }

  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }

  getBeatfilmMovies() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }
}

const moviesApi = new MoviesApi(moviesApiOptions);

export default moviesApi;
