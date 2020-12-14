import { load, save, remove } from './storage';
import myAdvert from '../templates/my-advert.hbs';

export default function renderOffice() {
  const user = load('Token').user;

  if (!user) document.querySelector('.header_registration_link').click();

  const info = {
    'My Calls': user.calls,
    'My Favourites': user.favourites,
  };

  document.querySelector('main div.container').innerHTML = myAdvert(info);
}

// async function renderOffice(event) {

//   const request = {
//     point: fetchFunctions.points.myCalls,
//   };

//   const newRequest = {
//     point: fetchFunctions.points.myFav,
//   };

//   if (event.target.hasAttribute('data-advert')) {
//     await fetchFunctions.getRequest(request).then(data => {
//       document.querySelector('main div.container').innerHTML = myAdvert(data);
//     });

//     return;
//   }

//   if (event.target.hasAttribute('data-favor')) {
//     await fetchFunctions.getRequest(newRequest).then(data => {
//       document.querySelector('main div.container').innerHTML = mySelectedAd(
//         data,
//       );
//     });

//     return;
//   }

//   if (event.target.hasAttribute('data-office')) {
//     await fetchFunctions.getRequest(request).then(data => {
//       document.querySelector('main div.container').innerHTML = myAdvert(data);
//     });

//     await fetchFunctions.getRequest(newRequest).then(data => {
//       document
//         .querySelector('main div.container')
//         .insertAdjacentHTML('beforeend', mySelectedAd(data));
//     });

//     return;
//   }
// }
