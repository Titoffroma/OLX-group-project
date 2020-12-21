import { pushError } from './pnotify';
import { load } from './storage';
import fetchFunctions from './fetchMe';
import hbs from '../templates/authorization-modal.hbs';

let errors = [];
let emailErrors = [];
let passwordErrors = [];
function validate(evt) {
  const googleAuthBtn = document.querySelector('.google-auth');
  const loginInput = document.querySelector('#authorization-modal-email');
  const passwordInput = document.querySelector('#authorization-modal-password');
  const loginBtn = document.querySelector('.authorization-modal-login');
  const registerBtn = document.querySelector('.authorization-modal-register');
  const emailErrorCont = document.querySelector('.email-error');
  const passwordErrorCont = document.querySelector('.password-error');
  if (evt.target === loginInput) {
    loginInput.addEventListener('blur', checkMail, { once: true });
  }
  if (evt.target === passwordInput) {
    passwordInput.addEventListener('blur', validatePassword, { once: true });
  }
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
    emailErrors = [];
    if (loginInput.value.length === 0) {
      errors.push('Введите адрес электронной почты');
      emailErrors.push('Введите адрес электронной почты');
    }

    if (
      loginInput.value.indexOf(',') >= 0 ||
      loginInput.value.indexOf(';') >= 0 ||
      loginInput.value.indexOf(' ') >= 0
    ) {
      errors.push('Адрес электронной почты был введен неправильно.');
      emailErrors.push('Адрес электронной почты был введен неправильно.');
    }
    const dog = loginInput.value.indexOf('@');
    if (dog == -1) {
      errors.push('Нет символа"@".');
      emailErrors.push('Нет символа"@".');
    }
    if (loginInput.value.indexOf('.') == -1) {
      errors.push('Нет символа"."');
      emailErrors.push('Нет символа"."');
    }
    if (dog < 1 || dog > loginInput.value.length - 5) {
      errors.push('Адрес электронной почты был введен неправильно.');
      emailErrors.push('Адрес электронной почты был введен неправильно.');
    }
    if (
      loginInput.value.charAt(dog - 1) == '.' ||
      loginInput.value.charAt(dog + 1) == '.'
    ) {
      errors.push('Адрес электронной почты был введен неправильно.');
      emailErrors.push('Адрес электронной почты был введен неправильно.');
    }
    renderErrors();
  }
  function validateLogin(evt) {
    evt.preventDefault();
    emailErrors = [];
    passwordErrors = [];
    if (loginInput.value.length === 0) {
      emailErrors.push('Введите вашу почту');
      renderErrors();
    } else {
      fetchLogin();
    }
  }

  function validatePassword() {
    passwordErrors = [];
    const p = passwordInput.value;
    if (p.length <= 8) {
      errors.push('Ваш пароль должен состоять хотя бы из 8-ми символов');
      passwordErrors.push(
        'Ваш пароль должен состоять хотя бы из 8-ми символов',
      );
    }
    if (p.search(/[a-z]/i) < 0) {
      errors.push('Ваш пароль должен иметь хотя бы одну букву');
      passwordErrors.push('Ваш пароль должен иметь хотя бы одну букву');
    }
    if (p.search(/[0-9]/) < 0) {
      errors.push('Ваш пароль должен иметь хотя бы одну цифру');
      passwordErrors.push('Ваш пароль должен иметь хотя бы одну цифру');
    }
    renderErrors();
  }
  function renderErrors() {
    emailErrorCont.textContent = emailErrors[0];
    passwordErrorCont.textContent = passwordErrors[0];
  }

  function validateRegistration(evt) {
    evt.preventDefault();
    errors = [...emailErrors, ...passwordErrors];
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
  errors = [];
  emailErrors = [];
  passwordErrors = [];
  document.body.addEventListener('click', validate);
  return markup;
}
