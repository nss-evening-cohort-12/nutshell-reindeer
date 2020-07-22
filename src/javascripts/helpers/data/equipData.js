import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

// Retrieve (CRUD)
const getAllEquipment = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipment.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});
// Create (CRUD)
const addEquipment = (equipObj) => axios.post(`${baseUrl}/equipment.json`, equipObj);
// Delete (CRUD)
const deleteEquipById = (equipId) => axios.delete(`${baseUrl}/equipment/${equipId}.json`);
// Retrieve by ID (CRUD)
const getEquipById = (equipId) => axios.get(`${baseUrl}/equipment/${equipId}.json`);
// Edit (CRUD)
const updateEquipment = (equipId, editedEquipObj) => axios.put(`${baseUrl}/equipment/${equipId}.json`, editedEquipObj);

export default {
  getAllEquipment,
  deleteEquipById,
  getEquipById,
  addEquipment,
  updateEquipment,
};
