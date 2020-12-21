import { getDataSearch, getDataCategory, getPage, getSale } from './callHistory'
import renderCards from '../../templates/cardset.hbs';
import decideTologin from '../main';
import renderPagination from '../../templates/pagination.hbs'


export function fun5 () {
    console.log('not found');;
}

export async function  fun6 () {
    let url = new URL(location.href).search;
    let data = await getDataSearch(url.split('=')[1]);
    document.querySelector('main div.container').innerHTML = renderCards(data);
}

export async function  fun7 () {
    const url = new URL(location.href).search;
    const data = await getDataCategory(url.split('=')[1]);
    document.querySelector('main div.container').innerHTML = renderCards(data);
}

export async function  fun8 () {
    const url = new URL(location.href).search;
    const data = await getPage(url.split('=')[1]);
    const markup = await decideTologin(data);
    const orderedSearch = renderPagination(markup);
    document.querySelector('main div.container').innerHTML = orderedSearch;
    if(document.querySelector('.pagination')){
        const ref ={
            pagin: document.querySelector('div[data-pagination]'),
        };
        const statePage = location.search.split('');
        const statePageNew = statePage[statePage.length - 1];
        ref.pagin.children.forEach(element => {element.classList.remove('active');
    });
    ref.pagin.children[statePageNew - 1].classList.add('active');
};
};

export async function  fun9 () {
    const url = new URL(location.href).search;
    const data = await getSale(url.split('=')[1]);
    document.querySelector('main div.container').innerHTML = renderCards(data);
}
