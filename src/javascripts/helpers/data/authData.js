import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../utils';

import navBar from '../../components/navBar/navBar';

const authDiv = $('#auth');
const logoutButton = $('#navbar-logout-button');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      logoutButton.removeClass('hide');
      utils.printToDom('#collectionName', 'You just logged in');
      navBar.navBarEventListeners();
    } else {
      authDiv.removeClass('hide');
      logoutButton.addClass('hide');
      utils.printToDom('#collectionName', '');
      utils.printToDom('#displayCards', '');
      navBar.navBarEventListeners();
    }
  });
};

export default { checkLoginStatus };
