import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../../helpers/utils';

const signMeIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleProvider);
};

const loginButton = () => {
  const domString = '<button id="google-auth" class="btn btn-warning"><i class="fab fa-google-plus"></i> LOG ME IN!!!</button>';
  utils.printToDom('#auth', domString);
  $('#google-auth').click(signMeIn);
};

const logoutEvent = () => {
  $('#navbar-logout-button').click((e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
};

const getUser = () => firebase.auth().currentUser;

export default { logoutEvent, loginButton, getUser };
