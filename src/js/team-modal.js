import teamModalTpl from '../templates/team-modal.hbs';
import Modal from './modalClass';

document.body.addEventListener('click', openTeamModal, { once: true });


export default function openTeamModal() {   
	const markup = teamModalTpl();
	
    return markup;
	};
