import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const updateSettings = (settingsObj) => {
  const user = firebase.auth().currentUser;
  axios.patch(`${baseUrl}/settings/${user.uid}.json`, settingsObj);
};

const initializeSettings = (userId, settingsObj) => axios.patch(`${baseUrl}/settings/${userId}.json`, settingsObj);

const getUserSettings = (userId) => new Promise((resolve, reject) => {
  console.warn('getUserSettings recieved', userId);
  const defaultSettings = {
    uid: userId,
    animation: true,
    sound: true,
    chaosMonkey: false,
  };
  if (userId) {
    axios.get(`${baseUrl}/settings.json?orderBy="$key"&equalTo="${userId}"`)
      .then((response) => {
        const userSettings = utils.convertFirebaseCollection(response.data)[0];
        if (!userSettings) {
          // user doesn't have a settings table yet
          initializeSettings(userId, defaultSettings);
          resolve(defaultSettings);
        } else {
          // user has existing settings table
          resolve(utils.convertFirebaseCollection(response.data)[0]);
        }
      })
      .catch((err) => reject(err));
  } else {
    // there is no user logged in
    resolve(defaultSettings);
  }
});

export default { getUserSettings, updateSettings };
