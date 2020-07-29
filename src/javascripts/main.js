import firebase from 'firebase/app';
import apiKeys from './helpers/apiKeys.json';

import auth from './components/auth/auth';
import authData from './helpers/data/authData';

import '../styles/main.scss';
import 'bootstrap';
import clickEvents from './helpers/clickEvents';
import causeChaos from './components/chaosMonkey/causeChaos';
import checkDino from './components/dinos/checkDino';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseConfig);
  authData.checkLoginStatus();
  auth.loginButton();
  auth.logoutEvent();
  clickEvents.clickEvents();
  causeChaos.randomChaos(); // sets the chaos counter to random number on init
  checkDino.checkDinoHandlers(); // checks for dinos with 1 or less than 1 handler
};

init();
