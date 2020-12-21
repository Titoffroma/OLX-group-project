import { load, save, remove } from './storage';
import myAdvert from '../templates/my-advert.hbs';
import decideTologin from './main';

export default async function renderOffice() {
  await decideTologin();
  const user = load('User');

  if (!user) return document.querySelector('.header_registration link').click();
  user.favourites.map(el => {
    el.liked = 'liked';
    el.fav = 'fav';
  });
  user.calls.map(el => (el.logged = 'logged'));
  const info = {
    'My Calls': user.calls,
    'My Favourites': user.favourites,
  };
  document.querySelector('main div.container').innerHTML = myAdvert(info);
}
