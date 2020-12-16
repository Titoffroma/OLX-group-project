(() => {
  const menuBtnRef = document.querySelector('[data-menu-button]');
  const menuBtnRefClose = document.querySelector('[data-menu-close]');
  const mobileBackd = document.querySelector('[data-backref]');

  menuBtnRef.addEventListener('click', openMenu);
  menuBtnRefClose.addEventListener('click', closeMenu);

  function openMenu() {
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
    document.body.classList.toggle('scroll-hidden');
    menuBtnRef.setAttribute('aria-expanded', !expanded);
    mobileBackd.classList.add('is-open');
    menuBtnRefClose.classList.add('is-open');
  }

  function closeMenu() {
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;
    menuBtnRef.classList.remove('is-open');
    menuBtnRefClose.classList.remove('is-open');
    menuBtnRef.setAttribute('aria-expanded', !expanded);
    mobileBackd.classList.remove('is-open');
  }
})();
