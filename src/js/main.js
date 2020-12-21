import { delPreloader } from './preloader.js';
import { load, save } from './storage';
import InitiateListeners from './listeners';
import fetchFunctions from './fetchMe';
import myModal from './modalClass';
import addPreloader from './preloader.js';

window.addEventListener('load', delPreloader);

myModal.startListener();
setGoogleAuth();
InitiateListeners();

export default async function decideTologin(param) {
  setMainPreloader();
  if (load('Token')) {
    const opt = {
      point: fetchFunctions.points.user,
    };
    const user = await fetchFunctions.getRequest(opt);
    if (user) {
      save('User', user);
      document.body.classList.add('authorized');
      if (param) {
        addUserStats(user, param);
        return param;
      }
    }
    return param;
  }
  document.body.classList.remove('authorized');
  return param;
}

function setGoogleAuth() {
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
}

function setMainPreloader() {
  const preloaderParent = document.querySelector('main');
  if (!document.querySelector('.preloader-backdrop')) {
    addPreloader(preloaderParent);
    preloaderParent.children[0].style.height = '100vh';
    preloaderParent.children[0].style.zIndex = '20';
  }
}

function addUserStats(user, param) {
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
}
