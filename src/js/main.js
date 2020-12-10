import { load, save, remove } from './storage';
import { pushError, removeError } from './pnotify';
import fetchFunctions from './fetchMe';

const logInfo = {
  email: 'titoff.roma@gmail.com',
  password: 'qweqwe12',
};

const request = {
  point: fetchFunctions.points.login,
  body: logInfo,
  method: 'POST',
};

const newRequest = {
  point: fetchFunctions.points.user,
};

async function some() {
  let response = await fetchFunctions.login(request);
  console.log('main', response);

  // response = await fetchFunctions.getRequest(newRequest);
  // console.log('before', response);

  // setTimeout(async () => {
  //   fetchFunctions.logout();
  // }, 3000);

  setTimeout(async () => {
    response = await fetchFunctions.getRequest(newRequest);
    console.log('after', response);
  }, 3000);

  // response = await fetchFunctions.login(request);
  // console.log('main', response);

  // setTimeout(async () => {
  //   response = await fetchFunctions.getRequest(newRequest);
  //   console.log('after', response);
  // }, 3000);
}
some();
