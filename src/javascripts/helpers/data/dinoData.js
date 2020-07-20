import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getDinos = () => axios.get(`${baseUrl}/dinosaurs.json`);

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
