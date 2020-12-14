import { load, save, remove } from './storage';
import { pushError, removeError } from './pnotify';
import fetchFunctions from './fetchMe';
import myModal from './modalClass';

myModal.startListener();
decideTologin();

export default async function decideTologin(param) {
  let user = load('Token').user;
  if (user) {
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
  document.body
    .querySelector('main div.container')
    .classList.remove('authorized');
}
