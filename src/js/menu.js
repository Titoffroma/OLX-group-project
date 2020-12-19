(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const body = document.querySelector('.header_button_menu_phone');
  const mobileBackd = document.querySelector('[data-backref]');

  //const filterActive = document.querySelector('.header_filter');

  const filterActive = document.querySelector('#menu-container');
  const entryButton = document.querySelector('[data-hbs="8"]');
  const exitButton = document.querySelector('span[data-hbs="9"]');
  const mycabinet = document.querySelector('[data-office]');
  const closeBurgerMenu = document.querySelector('.menu-button-close');

  const headerWindow = document.querySelector('.container_nav');

  const entryBtnTablet = document.querySelector(
    '.header_button__identity span',
  );
  const entryCabTablet = document.querySelector('.header_button__mycab_link');
  if (document.documentElement.clientWidth < 1280) {
    mobileBackd.classList.add('hide');
  }

  menuBtnRef.addEventListener('click', openMenu, { once: true });
  filterActive.addEventListener('click', closeMenu, { once: true });
  headerWindow.addEventListener('click', openCabinet, { once: true });
  entryBtnTablet.addEventListener('click', openCabinetTablet, { once: true });

  function openMenu(event) {
    event.preventDefault();
    menuBtnRef.addEventListener('click', openMenu, { once: true });
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
    menuBtnRef.setAttribute('aria-expanded', !expanded);
    mobileBackd.classList.toggle('hide');
    closeBurgerMenu.classList.toggle('hide');
    setTimeout(() => {
      mobileBackd.classList.toggle('is-hidden');
      menuBtnRef.classList.toggle('is-hidden');
      closeBurgerMenu.classList.toggle('burger-is-open');
    }, 250);
  }

  function closeMenu(event) {
    event.preventDefault();
    filterActive.addEventListener('click', closeMenu, { once: true });
    if (event.target.nodeName === 'A' || 'BUTTON') {
      mobileBackd.classList.toggle('is-hidden');
      menuBtnRef.classList.toggle('is-hidden');
      closeBurgerMenu.classList.toggle('burger-is-open');
      setTimeout(() => {
        mobileBackd.classList.toggle('hide');
        closeBurgerMenu.classList.toggle('hide');
      }, 250);
    }
    return;
  }

  function openCabinet(event) {
    event.preventDefault();
    headerWindow.addEventListener('click', openCabinet, { once: true });
    entryButton.classList.toggle('outMyCabinet');
    mycabinet.classList.toggle('inMyCabinet');
    exitButton.classList.toggle('inMyCabinet');
  }

  function openCabinetTablet() {
    entryBtnTablet.addEventListener('click', openCabinetTablet, { once: true });
    if (document.body.classList.contains('authorized')) {
      entryCabTablet.classList.toggle('inCab');
      entryBtnTablet.setAttribute('data-modal', false);
    }
    if (!document.body.classList.contains('authorized')) {
      entryBtnTablet.setAttribute('data-modal', true);
      entryCabTablet.classList.remove('inCab');
    }
  }

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
