const authBackdrop = document.querySelector('.authorization-backdrop');
const loginBtn = document.querySelector('.authorization-modal-login');
const loginInput = document.querySelector('#authorization-modal-email');
const passwordInput = document.querySelector('#authorization-modal-password');
const registerBtn = document.querySelector('.authorization-modal-register');
import { load, save, remove } from './storage';
import { pushError, removeError } from './pnotify';
import fetchFunctions from './fetchMe';
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
  let response = await fetchFunctions.getRequest(request);
  console.log(response);
  if (response.id) {
    await fetchLogin();
  }
}
function validateLogin(evt) {
  evt.preventDefault();
  if (loginInput.value.length === 0) {
    return;
  }

  fetchLogin();
}
let errors;
function validatePassword() {
  const p = passwordInput.value;

  if (p.length < 8) {
    pushError('Your password must be at least 8 characters');
  }
  if (p.search(/[a-z]/i) < 0) {
    pushError('Your password must contain at least one letter.');
  }
  if (p.search(/[0-9]/) < 0) {
    pushError('Your password must contain at least one digit.');
  }
}
function validateLoginForRegistration() {
  if (loginInput.value.length === 0) {
    pushError('Enter login');
  } else if (loginInput.value.length <= 5) {
    pushError('Your login must be at least 6 characters');
  }
}
function validateRegistration(evt) {
  errors = [];
  evt.preventDefault();
  validatePassword();
  validateLoginForRegistration();
  if (errors.length < 1) {
    fetchRegistration();
  }
}

loginBtn.addEventListener('click', validateLogin);
registerBtn.addEventListener('click', validateRegistration);
