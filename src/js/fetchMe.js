import { load, save, remove } from './storage';
import { pushError, removeError } from './pnotify';

class FetchMe {
  constructor() {
    this.URL = 'https://callboard-backend.herokuapp.com';
    this._token = {
      accessToken: '',
      refreshToken: '',
      sid: '',
    };
    this.points = {
      reg: '/auth/register',
      login: '/auth/login',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      google: '/auth/google',
      user: '/user',
      call: '/call',
      fav: '/call/favourite',
      myFav: '/call/favourites',
      myCalls: '/call/own',
    };
    this.headers = {
      'Content-Type': 'application/json',
      authorization: this.token.accessToken,
    };
  }
  get token() {
    return this._token;
  }
  set token(token) {
    let i = 0;
    for (let key in token) {
      this._token[Object.keys(token)[i]] = token[Object.keys(token)[i]];
      i += 1;
    }
  }
  logout() {
    const opt = { point: this.points.logout, method: 'POST', logout: true };
    this.getRequest(opt);
    // console.log('deleted', load('Token').sid);
  }
  async login(opt) {
    return await this.getRequest(opt).then(data => {
      // console.log('saved', data);
      this.token = data;
      save('Token', data);
      return data;
    });
  }
  async getRequest({
    point,
    method = 'GET',
    body = null,
    query = '',
    logout = false,
  }) {
    const opt = {
      method,
      headers: this.headers,
    };
    if (body) opt.body = JSON.stringify(body);
    if (!this.token.accessToken.length) {
      if (load('Token')) opt.headers.authorization = load('Token').accessToken;
    }
    const par = logout ? false : opt;

    const url = this.URL + point + query;
    return await this.sendRequest(url, par);
  }
  async sendRequest(url, opt) {
    try {
      console.log(opt);
      if (!opt)
        return fetch(url, {
          method: 'POST',
          headers: { accept: '*/*', authorization: this.token.accessToken },
        });
      const response = await fetch(url, opt);
      if (response.status === 401) {
        const newResponse = await this.refresh(url, opt);
        return await newResponse.json();
      } else if (!response.ok) {
        await response.json().then(data => pushError(data.message));
        return;
      }
      return await response.json();
    } catch (err) {
      console.log('mistake', err);
    }
  }
  async refresh(url, opt) {
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: load('Token').refreshToken,
      },
      body: JSON.stringify({ sid: load('Token').sid }),
    };
    try {
      const response = await fetch(this.URL + this.points.refresh, option);
      response.json().then(data => {
        console.log('new Toc', data);
        this.token = data;
        save('Token', this.token);
      });
      return await this.sendRequest(url, opt);
    } catch (err) {
      console.log('mistake 2', err.message);
    }
  }
}

const fetchFunctions = new FetchMe();

export default fetchFunctions;
