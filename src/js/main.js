import { load, save, remove } from './storage';
import { pushError, removeError } from './pnotify';
import fetchFunctions from './fetchMe';
import myModal from './modalClass';
//import { onPaginationPage } from './paginationCategories';
import './editProduct';
import fetchLogin from './authorization.js';


myModal.startListener();

export default async function decideTologin(param) {
  if (load('Token')) {
    const opt = {
      point: fetchFunctions.points.user,
    };
    const user = await fetchFunctions.getRequest(opt);
    if (user) {
      save('User', user);
      document.body
        .querySelector('main div.container')
        .classList.add('authorized');
      if (param) {
        const fav = user.favourites;
        if (Array.isArray(param)) {
          param.map(el => {
            for (let i = 0; i < fav.length; i++) {
              if (el._id == fav[i]._id) {
                el.liked = 'liked';
              }
            }
          });
        } else {
          console.log(param);
          for (let keys in param) {
            param[keys].map(el => {
              for (let i = 0; i < fav.length; i++) {
                if (el._id == fav[i]._id) {
                  el.liked = 'liked';
                }
              }
            });
          }
        }
        return param;
      }
    }
    return;
  }
  document.body
    .querySelector('main div.container')
    .classList.remove('authorized');
  return param;
}
