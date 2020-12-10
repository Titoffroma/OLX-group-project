import renderCards from '../templates/cardset.hbs';
import category from '../templates/category.hbs';

// Небольшая инструкция
// Импортирум экземпляр класса
import fetchFunctions from './fetchMe';
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
/* this.points = {
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
    };*/
// Например для логина создается такой объект параметров запроса
const request = {
  point: fetchFunctions.points.login,
  body: logInfo,
  method: 'POST',
  //query: '1'
};
// А для для получения данных пользователя создается такой объект параметров запроса
const newRequest = {
  point: fetchFunctions.points.user,
};

// //////3/ Чтоб получить информацию с бэкэнда в классе имеются 3 метода:
// login() и logout() - для входа и выхода
// все остальные запросы - метод getRequest()
// Раскоментируйте вызов функции some() и посмотрите что приходит в консоль
async function some() {
  let response = await fetchFunctions.login(request);
  console.log('login -', response);
  response = await fetchFunctions.logout();
  console.log('logout - всегда вернет undefined - ', response);
  response = await fetchFunctions.getRequest(newRequest);
  console.log('get user - unauthorized -', response);
  response = await fetchFunctions.login(request);
  response = await fetchFunctions.getRequest(newRequest);
  console.log('get user - authorized -', response);
}
// some();

// //////4/ Раскоментируйте вызов функции для демонстрации рендера разметки по запросу
// (async () => {
//   const request = {
//     point: fetchFunctions.points.login,
//     body: logInfo,
//     method: 'POST',
//   };
//   fetchFunctions.login(request);
//   const searchQuery = {
//     point: fetchFunctions.points.call,
//     query: '?page=2',
//   };
//   const searchResult = await fetchFunctions.getRequest(searchQuery);
//   console.log(searchResult);
//   let orderedSearch = [];
//   for (let key in searchResult) {
//     orderedSearch.push(...searchResult[key]);
//   }

//   document.querySelector('main div.container').innerHTML = category(
//     searchResult,
//   );
// })();
