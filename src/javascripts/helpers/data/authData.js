import firebase from 'firebase/app';
import 'firebase/auth';
import LogButtons from '../../components/auth/auth';

import utils from '../utils';
import settings from '../../components/settings/settings';

// import chaosMonkey from '../../components/chaosMonkey/toast';

const getCurrentUserId = () => {
  const user = firebase.auth().currentUser;
  return user.uid;
};

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      utils.printToDom('#displayCards', '');
      $('#addButtonDiv').removeClass('hide');
      LogButtons.logoutButton();
      settings.settingsMenu(user);
      // window.setInterval(chaosMonkey.bringChaosMonkey, 25000);
    } else {
      LogButtons.loginButton();
      $('#addButtonDiv').addClass('hide');
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

export default {
  checkLoginStatus, secureButtons, checkAuth, getCurrentUserId,
};
