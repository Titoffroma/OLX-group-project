import teamModalTpl from '../templates/team-modal.hbs';

document.body.addEventListener('click', openTeamModal, { once: true });

export default function openTeamModal() {
  const markup = teamModalTpl();

  return markup;
}
