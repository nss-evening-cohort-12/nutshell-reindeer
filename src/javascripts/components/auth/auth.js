import firebase from 'firebase/app';
import 'firebase/auth';

import utils from '../../helpers/utils';

const logoutButton = () => {
  const domString = '<button class="nav-link btn btn-danger mr-sm-2" id="logoutButton"><i class="fas fa-sign-out-alt"></i>  Logout</button>';
  utils.printToDom('.logButton', domString);
};

const signMeIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleProvider);
};

const loginButton = () => {
  const domString = '<button id="google-auth" class="btn btn-warning"><i class="fab fa-google-plus"></i> Log in</button>';
  utils.printToDom('.logButton', domString);
};

const logoutEvent = () => {
  firebase.auth().signOut();
};

const getUser = () => firebase.auth().currentUser;

export default {
  logoutEvent,
  loginButton,
  getUser,
  logoutButton,
  signMeIn,
};
