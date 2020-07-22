import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllRides = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const addRide = (equipObj) => axios.post(`${baseUrl}/rides.json`, equipObj);

const deleteRideById = (equipId) => axios.delete(`${baseUrl}/rides/${equipId}.json`);

const getRideById = (equipId) => axios.get(`${baseUrl}/rides/${equipId}.json`);

const updateRide = (equipId, editedEquipObj) => axios.put(`${baseUrl}/rides/${equipId}.json`, editedEquipObj);

export default {
  getAllRides, addRide, deleteRideById, getRideById, updateRide,
};
