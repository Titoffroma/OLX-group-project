(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const body = document.querySelector('.header_button_menu_phone');
  const mobileBackd = document.querySelector('[data-backref]');

  // const filterActive = document.querySelector('.header_filter');

  const filterActive = document.querySelector('#menu-container');
  const entryButton = document.querySelector('span[data-hbs="8"]');
  const exitButton = document.querySelector('span[data-hbs="9"]');
  const mycabinet = document.querySelector('[data-office]');

  const headerWindow = document.querySelector('.container_nav');

  menuBtnRef.addEventListener('click', openMenu, { once: true });
  filterActive.addEventListener('click', closeMenu, { once: true });
  headerWindow.addEventListener('click', openCabinet, { once: true });
  body.addEventListener('click', close);

  // body.addEventListener('click', event => {
  //   openMenu();
  //   closeMenu(event);
  //   openCabinet();
  // });

  function openMenu() {
    menuBtnRef.addEventListener('click', openMenu, { once: true });
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
    menuBtnRef.setAttribute('aria-expanded', !expanded);
    mobileBackd.classList.toggle('is-open');
    menuBtnRef.classList.toggle('is-open');
  }

  function close(event) {}

  function closeMenu(event) {
    filterActive.addEventListener('click', closeMenu, { once: true });
    if (event.target.nodeName === 'A' || 'BUTTON') {
      mobileBackd.classList.toggle('is-open');
      menuBtnRef.classList.toggle('is-open');
    }
    return;
  }

  function openCabinet() {
    headerWindow.addEventListener('click', openCabinet, { once: true });
    entryButton.classList.toggle('outMyCabinet');
    mycabinet.classList.toggle('inMyCabinet');
    exitButton.classList.toggle('inMyCabinet');
    if (document.body.classList.contains('authorized')) {
      //entryBtnTablet.classList.remove('[data-hbs="8"]');
      //entryCabTablet.classList.add('inCab');
      // entryButton.classList.toggle('outMyCabinet');
    }
  }

  const entryBtnTablet = document.querySelector('.header_button__identity');
  const entryCabTablet = document.querySelector('.header_button__mycab_link');

  // entryBtnTablet.addEventListener('click', openCabinetTablet, { once: true });

  //function openCabinetTablet() {}

  // const cabinetItem = document.querySelector('[data-index]');
  // const item = document.querySelector('.my-office');

  // item.addEventListener('click', cabinetList, { once: true });

  // function cabinetList() {
  //   mycabinet.addEventListener('click', cabinetList, { once: true });
  //   cabinetItem.scrollIntoView({ block: 'start', behavior: 'smooth' });
  // }
})();
