(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const body = document.querySelector('.header_button_menu_phone');
  const mobileBackd = document.querySelector('[data-backref]');

  // const myCabList = document.querySelector('a[data-ind]');

  const filterActive = document.querySelector('#menu-container');
  const entryButton = document.querySelector('span[data-hbs="8"]');
  const exitButton = document.querySelector('span[data-hbs="9"]');
  const mycabinet = document.querySelector('[data-office]');

  const headerWindow = document.querySelector('.container_nav');

  menuBtnRef.addEventListener('click', openMenu);
  filterActive.addEventListener('click', closeMenu);
  headerWindow.addEventListener('click', openCabinet);
  body.addEventListener('click', close);

  // body.addEventListener('click', event => {
  //   openMenu();
  //   closeMenu(event);
  //   openCabinet();
  // });

  function openMenu() {
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
    menuBtnRef.setAttribute('aria-expanded', !expanded);
    mobileBackd.classList.toggle('is-open');
    menuBtnRef.classList.toggle('is-open');
  }

  function close(event) {}

  function closeMenu(event) {
    if (event.target.nodeName === 'A' || 'BUTTON') {
      mobileBackd.classList.toggle('is-open');
      menuBtnRef.classList.toggle('is-open');
    }
  }

  function openCabinet() {
    entryButton.classList.toggle('outMyCabinet');
    mycabinet.classList.toggle('inMyCabinet');
    exitButton.classList.toggle('inMyCabinet');
  }

  // const cabinetItem = document.querySelector('[data-ind="2"]');

  // function cabinetList() {
  //   cabinetItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
  // }

  // mycabinet.addEventListener('click', cabinetList);
})();
