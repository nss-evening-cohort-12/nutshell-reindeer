import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../utils';
// import chaosMonkey from '../../components/chaosMonkey/toast';

const authDiv = $('#auth');
const logoutButton = $('#navbar-logout-button');
const addButton = $('#addButtonDiv');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      logoutButton.removeClass('hide');
      utils.printToDom('#collectionName', 'You just logged in');
      utils.printToDom('#displayCards', '');
      addButton.removeClass('hide');
      // window.setInterval(chaosMonkey.bringChaosMonkey, 25000);
    } else {
      addButton.addClass('hide');
      authDiv.removeClass('hide');
      logoutButton.addClass('hide');
      utils.printToDom('#collectionName', '');
      utils.printToDom('#displayCards', '');
    }
  });
};

// call this to appropriately hide things with '.auth-only' class:
const secureButtons = () => {
  if (!firebase.auth().currentUser) {
    $(document).ready(() => {
      $('.authOnly').addClass('hide');
    });
  }
};

// returns either user info or null (can use like true or false)
const checkAuth = () => firebase.auth().currentUser;

export default { checkLoginStatus, secureButtons, checkAuth };
