import renderCards from '../templates/cardset.hbs';
import category from '../templates/category.hbs';
import { load, save, remove } from './storage';

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
  point: fetchFunctions.points.find,
  query: 'shirt',
};

// //////3/ Чтоб получить информацию с бэкэнда в классе имеются 3 метода:
// login() и logout() - для входа и выхода
// все остальные запросы - метод getRequest()
// Раскоментируйте вызов функции some() и посмотрите что приходит в консоль
async function some() {
  let response = await fetchFunctions.login(request);
  console.log('login -', response);
  response = await fetchFunctions.logout();
  console.log('logout -', response);
  response = await fetchFunctions.getRequest(newRequest);
  console.log('get user - unauthorized -', response);
  response = await fetchFunctions.login(request);
  response = await fetchFunctions.getRequest(newRequest);
  console.log('get user - authorized -', response);
}
// some();

// // //////4/ Раскоментируйте вызов функции для демонстрации рендера разметки по запросу

const formFile = document.querySelector('.add-card__form');
const inputFile = document.getElementById('inputFile');
const button = document.querySelector('.submit-btn');

let i = 0;
let files = [];
let type = '';

const fileReader = new FileReader();

// fileReader.onloadstart = () => {
//   button.setAttribute('disabled', 'disabled');
//   console.log('start');
// };

// fileReader.onload = e => {
//   files.push(`${e.target.result}type=${type}`);
//   console.log(files);
//   button.removeAttribute('disabled');
// };

// inputFile.addEventListener('change', () => {
//   if (i < 5) {
//     type = inputFile.files[0].type;
//     fileReader.readAsBinaryString(inputFile.files[0]);
//     console.log(type);
//     console.log('change');
//     i++;
//   }
// });
// const formData = new FormData();

// const myHeaders = new Headers();

// formFile.addEventListener('submit', submitFiles);
// inputFile.addEventListener('input', function () {
//   console.log(inputFile.files[0]);
//   formData.append('file', inputFile.files[0]);
// });

// async function submitFiles(event) {
//   event.preventDefault();

//   formData.append('title', 'Boy');
//   formData.append('description', 'Logo for Instagram');
//   formData.append('category', 'business and services');
//   formData.append('price', '300');
//   formData.append('phone', '+380971468686');

//   myHeaders.append('Authorization', `Bearer ${load('Token').accessToken}`);

//   const bodyPhoto = {
//     title: 'Palm',
//     description: 'Logo for Instagram',
//     category: 'business and services',
//     price: 100,
//     phone: '+380971468686',
//     file: inputFile.files[0],
//   };

//   const URL = 'https://callboard-backend.herokuapp.com/call';
//   const requestOptions = {
//     method: 'POST',
//     redirect: 'follow',
//     headers: myHeaders,
//     body: formData,
//   };
//   console.log(requestOptions);
//   const answer = await fetch(URL, requestOptions);
//   console.log(answer);
// }
