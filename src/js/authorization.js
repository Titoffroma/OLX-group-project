import { pushError } from './pnotify';
import { load } from './storage';
import fetchFunctions from './fetchMe';
import hbs from '../templates/authorization-modal.hbs';

function validate(evt) {
  let errors = [];

  const authBackdrop = document.querySelector('.backdrop');
  const googleAuthBtn = document.querySelector('.google-auth');
  const loginInput = document.querySelector('#authorization-modal-email');
  const passwordInput = document.querySelector('#authorization-modal-password');
  const loginBtn = document.querySelector('.authorization-modal-login');
  const registerBtn = document.querySelector('.authorization-modal-register');
  if (evt.target === googleAuthBtn) return;
  if (evt.target === loginBtn) return validateLogin(evt);
  if (evt.target === registerBtn) return validateRegistration(evt);

  async function fetchLogin() {
    const info = {
      email: loginInput.value,
      password: passwordInput.value,
    };

    const request = {
      point: fetchFunctions.points.login,
      body: info,
      method: 'POST',
    };

    let response = await fetchFunctions.login(request);

    if (response) {
      location.reload();
    }
  }

  async function fetchRegistration() {
    const info = {
      email: loginInput.value,
      password: passwordInput.value,
    };
    const request = {
      point: fetchFunctions.points.reg,
      body: info,
      method: 'POST',
    };
    try {
      let response = await fetchFunctions.getRequest(request);
      if (response.id) {
        await fetchLogin();
      }
    } catch (error) {
      console.log(error);
    }
  }
  function checkMail() {
    if (loginInput.value.indexOf('.') == -1) {
      pushError('Нет символа"."');
      errors.push('Нет символа"."');
    }
    if (
      loginInput.value.indexOf(',') >= 0 ||
      loginInput.value.indexOf(';') >= 0 ||
      loginInput.value.indexOf(' ') >= 0
    ) {
      pushError('Адрес электронной почты был введен неправильно.');
      errors.push('Адрес электронной почты был введен неправильно.');
    }
    const dog = loginInput.value.indexOf('@');
    if (dog == -1) {
      console.log('No at!');
      pushError('Нет символа"@".');
      errors.push('Нет символа"@".');
    }
    if (dog < 1 || dog > loginInput.value.length - 5) {
      pushError('Адрес электронной почты был введен неправильно.');
      errors.push('Адрес электронной почты был введен неправильно.');
    }
    if (
      loginInput.value.charAt(dog - 1) == '.' ||
      loginInput.value.charAt(dog + 1) == '.'
    ) {
      pushError('Адрес электронной почты был введен неправильно.');
      errors.push('Адрес электронной почты был введен неправильно.');
    }
  }
  function validateLogin(evt) {
    evt.preventDefault();

    if (loginInput.value.length === 0) {
      errors.push('Введите вашу почту');
      pushError('Введите вашу почту');
    }

    fetchLogin();
  }

  function validatePassword() {
    const p = passwordInput.value;
    if (p.length <= 8) {
      errors.push('Ваш пароль должен состоять хотя бы из 8-ми символов');
      pushError('Ваш пароль должен состоять хотя бы из 8-ми символов');
    }
    if (p.search(/[a-z]/i) < 0) {
      errors.push('Ваш пароль должен иметь хотя бы одну букву');
      pushError('Ваш пароль должен иметь хотя бы одну букву');
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push('Ваш пароль должен иметь хотя бы одну цифру');
      pushError('Ваш пароль должен иметь хотя бы одну цифру');
    }
  }

  function validateLoginForRegistration() {
    checkMail();
    if (loginInput.value.length === 0) {
      errors.push('Введите вашу почту');
      pushError('Введите вашу почту');
    }
  }

  function validateRegistration(evt) {
    evt.preventDefault();
    errors = [];

    validatePassword();
    validateLoginForRegistration();

    if (errors.length < 1) {
      fetchRegistration();
    }
  }
}
export default function openModalAuth() {
  if (load('User')) {
    document.querySelector('button[data-office]').click();
    return false;
  }
  const markup = hbs();
  document.body.addEventListener('click', validate);
  return markup;
}
