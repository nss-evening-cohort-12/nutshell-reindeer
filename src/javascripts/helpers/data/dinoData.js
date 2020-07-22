import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getDinos = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinosaurs.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const addDino = (dinoObj) => axios.post(`${baseUrl}/dinosaurs.json`, dinoObj);

const deleteDinosById = (dinoId) => axios.delete(`${baseUrl}/dinosaurs/${dinoId}.json`);

const getDinoById = (dinoId) => axios.get(`${baseUrl}/dinosaurs/${dinoId}.json`);

const updateDino = (dinoId, editedDinoObj) => axios.put(`${baseUrl}/dinosaurs/${dinoId}.json`, editedDinoObj);

export default {
  getDinos,
  addDino,
  deleteDinosById,
  getDinoById,
  updateDino,
};
