import { load, remove, save } from './storage';
import fetchFunctions from './fetchMe';
import myModal from './modalClass';
import './editProduct';
import addPreloader from './preloader.js';
import '../js/history/categoryHistory.js'
import '../js/history/mainHistory.js'


myModal.startListener();

export default async function decideTologin(param) {
  const urlSearch = location.search;
  if (urlSearch.includes('accessToken')) {
    const searchQuery = urlSearch.slice(1).split('&');
    let token = {};
    searchQuery.map(el => {
      const query = el.split('=');
      token[query[0]] = query[1];
    });
    location.href = location.href.split('?')[0];
    save('Token', token);
  }
  const preloaderParent = document.querySelector('main');
  if (!document.querySelector('.preloader-backdrop')) {
    addPreloader(preloaderParent);
    preloaderParent.children[0].style.height = '100vh';
    preloaderParent.children[0].style.zIndex = '20';
  }
  if (load('Token')) {
    const opt = {
      point: fetchFunctions.points.user,
    };
    const user = await fetchFunctions.getRequest(opt);
    if (user) {
      save('User', user);
      document.body.classList.add('authorized');
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
    return param;
  }
  document.body.classList.remove('authorized');
  return param;
}
