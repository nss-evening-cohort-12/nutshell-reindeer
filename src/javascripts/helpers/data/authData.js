import firebase from 'firebase/app';
import 'firebase/auth';
import auth from '../../components/auth/auth';
import settingsData from './settingsData';

import utils from '../utils';
import settings from '../../components/settings/settings';
import doorOpenAnim from '../../components/doorOpenAnim/doorOpenAnim';

// import chaosMonkey from '../../components/chaosMonkey/toast';

const getCurrentUserId = () => {
  const user = firebase.auth().currentUser;
  return user.uid;
};

// const checkAnimSetting = () => new Promise((resolve, reject) => {
//   settingsData.getUserSettings(user.uid)
//     .then((userSettings) => {
//       resolve(userSettings.animation);
//     })
//     .catch((err) => reject(err));
// });

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      settingsData.getUserSettings(user.uid)
        .then((userSettings) => {
          console.warn('checkLoginStatus recieved', userSettings);
          if (userSettings.animation) {
            doorOpenAnim.openDoors();
          }
        });
      console.warn('this is under the promise');
      settings.settingsMenu(user);
      utils.printToDom('#displayCards', '');
      $('#addButtonDiv').removeClass('hide');
      // auth.logoutButton();
      // window.setInterval(chaosMonkey.bringChaosMonkey, 25000);
    } else {
      settings.settingsMenu();
      doorOpenAnim.openDoors();
      $('#addButtonDiv').addClass('hide');
      utils.printToDom('#collectionName', '');
      utils.printToDom('#displayCards', '');
      utils.printToDom('#notifications', '');
      auth.loginButton();
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
