import { fun5 } from './updatePageHistory';
import { routers } from './routers';

let auth = true;
let startState = true;

let navbarNav = document.querySelector('.container');

function updatePage(e) {
  if (e.target.tagName !== 'A') return;
  e.preventDefault();
  refreshHistoryOnClick(e);
  updatedContent();
}

function refreshHistoryOnClick(e) {
  const query = e.target.getAttribute('href');
  updateHistory(query);
}

const updateHistory = query => {
  let router = routers.find(item => item.path === query);
  if (!router) return;
  if (!router.meta.auth || !auth) updateState(query);
};

window.onpopstate = function () {
  updatedContent();
};
let state = null;
export const updatedContent = () => {
  let router = routers.find(
    item => item.path === history.state || item.path === location.pathname,
  );
  if (!router) {
    fun5();
    return;
  }
  if (!router.meta.auth || !auth) {
    router.component();
  }
  // else if (router.meta.auth && auth && startState) {
  //     routers[0].component();
  //     updateState(routers[0].path)
  // }
  startState = false;
};

export const updateState = payload => {
  history.pushState(payload, null, payload);
};
window.addEventListener('load', updatedContent());
