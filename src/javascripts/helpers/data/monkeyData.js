import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMonkeyLog = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/monkeyLog.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const addMonkeyLog = (monkeyObj) => axios.post(`${baseUrl}/monkeyLog.json`, monkeyObj);

export default {
  getMonkeyLog,
  addMonkeyLog,
};
