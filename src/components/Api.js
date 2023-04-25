class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  fetchUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}

export default Api;
