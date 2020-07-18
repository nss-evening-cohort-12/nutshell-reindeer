import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../utils';

import navBar from '../../components/navBar/navBar';

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
      navBar.navBarEventListeners();
      addButton.removeClass('hide');
    } else {
      addButton.addClass('hide');
      authDiv.removeClass('hide');
      logoutButton.addClass('hide');
      utils.printToDom('#collectionName', '');
      utils.printToDom('#displayCards', '');
      navBar.navBarEventListeners();
    }
  });
};

export default { checkLoginStatus };
