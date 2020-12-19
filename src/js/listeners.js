import hbsFunction from '../templates/filter.hbs';
import renderCategories from '../templates/category.hbs';
import renderPagination from '../templates/pagination.hbs';
import fetchFunctions from './fetchMe.js';
import renderOffice from './myOffice';
import decideTologin from './main';
import { updatedContent, updateState } from './history/mainHistory';
import paginationAll from './pagination-for-All';
import { openMenu, closeMenu } from './menu';
import { save } from './storage';
import slider from './slider';
document.body.addEventListener('click', listenAllClicks);

function listenAllClicks() {}
