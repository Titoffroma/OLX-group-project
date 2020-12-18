import { getDataSearch, getDataCategory } from './callHistory'
import renderCards from '../../templates/cardset.hbs';
import fetchFunctions from '../fetchMe';
// import renderFilter from './js/filter'
// import mySelectedAd from './templates/my-advert.hbs'
// import renderOffice from './js/myOffice'
import decideTologin from '../main';
import renderPagination from '../../templates/pagination.hbs'


export function fun5 () {
    console.log('not found');;
}

export async function  fun6 () {
    let url = new URL(location.href).search;
    let data = await getDataSearch(url.split('=')[1]);
    document.querySelector('main div.container').innerHTML = renderCards(data)
  
  
}

export async function  fun7 () {
    const url = new URL(location.href).search;
    const data = await getDataCategory(url.split('=')[1]);
   
    document.querySelector('main div.container').innerHTML = renderCards(data)
  
}

export async function  fun8 () {
    const search = new URL(location.href).search;
   
}

export async function  fun9 () {
    const url = new URL(location.href).search;
    const data = await getDataCategory(url.split('=')[1]);
   
    document.querySelector('main div.container').innerHTML = renderCards(data)
}
