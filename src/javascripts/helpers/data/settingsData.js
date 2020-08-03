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
  const defaultSettings = {
    uid: userId,
    animation: true,
    sound: true,
    chaosMonkey: false,
  };
  if (userId) {
    axios.get(`${baseUrl}/settings.json?orderBy="uid"&equalTo="${userId}"`)
      .then((response) => {
        console.warn('from axios get', response);
        if (!response.data) {
          // user doesn't have a settings table yet
          console.warn('no user data');
          initializeSettings(userId, defaultSettings);
          resolve(defaultSettings);
        } else {
          console.warn('current user`s settings file', response);
          resolve(utils.convertFirebaseCollection(response.data)[0]);
        }
      })
      .catch((err) => reject(err));
  } else {
    resolve(defaultSettings);
  }
});

// const getUserSettings = (userId) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/settings.json?orderBy="uid"&equalTo="${`${userId}fake`}"`)
//     .then((response) => {
//       if (!response.data[0]) { console.warn('no data'); }
//       resolve(utils.convertFirebaseCollection(response.data));
//     })
//     .catch((err) => reject(err));
// });

// const getUserSettings = (userId) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/settings.${userId}.json?`)
//     .then((response) => {
//       if (!response.data[0]) { console.warn('no data'); }
//       console.warn(response);
//       resolve(utils.convertFirebaseCollection(response.data));
//     })
//     .catch((err) => reject(err));
// });

export default { getUserSettings, updateSettings };
