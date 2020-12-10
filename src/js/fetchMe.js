import { load, save, remove } from './storage';
import { pushError } from './pnotify';

class FetchMe {
  constructor() {
    this.URL = 'https://callboard-backend.herokuapp.com';
    this._token = {
      accessToken: '',
      refreshToken: '',
      sid: '',
    };
    this.points = {
      reg: '/auth/register/',
      login: '/auth/login/',
      logout: '/auth/logout/',
      refresh: '/auth/refresh/',
      google: '/auth/google/',
      user: '/user/',
      call: '/call/',
      fav: '/call/favourite/',
      myFav: '/call/favourites/',
      myCalls: '/call/own/',
    };
    this.headers = {
      'Content-Type': 'application/json',
      authorization: '',
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
    remove('Token');
    this.token = {
      accessToken: '',
      refreshToken: '',
      sid: '',
    };
  }
  async login(opt) {
    return await this.getRequest(opt).then(data => {
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
    if (load('Token')) opt.headers.authorization = load('Token').accessToken;
    const par = logout ? false : opt;
    const url = this.URL + point + query;
    return await this.sendRequest(url, par);
  }
  async sendRequest(url, opt) {
    try {
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
      console.log('mistake', err.message);
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

// Небольшая инструкция
// ///////1/ Перед отправкой запросов нужно создать объект для body запроса,
// если этого требует API(для метода 'GET' не нужно).
// Напрмер для логина в body отправляется такой объект:
const logInfo = {
  email: 'titoff.roma@gmail.com',
  password: 'qweqwe12',
};
// //////2/ Затем нужно создать объект параметров запроса, он включает в себя до 4 параметров,
// в зависимости от запроса(как в доках API)
// point - обязательный параметр, он указывает на какой адрес отправлять запрос
// Все point для нашего API указаны к конструкторе класса - в свойстве points
// Например для логина создается такой объект параметров запроса
const request = {
  point: fetchFunctions.points.login,
  body: logInfo,
  method: 'POST',
  //query: '1'
};
// Например для для получения данных пользователя создается такой объект параметров запроса
const newRequest = {
  point: fetchFunctions.points.user,
};
// //////3/ Чтоб получить информацию с бэкэнда в классе имеются 3 метода:
//
async function some() {
  let response = await fetchFunctions.login(request);

  console.log('login -', response);

  response = fetchFunctions.logout();

  console.log('logout - всегда вернет undefined - ', response);

  response = await fetchFunctions.getRequest(newRequest);

  console.log('get user - unauthorized -', response);

  response = await fetchFunctions.login(request);

  response = await fetchFunctions.getRequest(newRequest);

  console.log('get user - authorized -', response);
}
some();
