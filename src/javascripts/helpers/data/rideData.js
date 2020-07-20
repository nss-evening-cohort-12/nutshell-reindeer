import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

// Retrieve (CRUD)
const getAllRides = () => axios.get(`${baseUrl}/rides.json`);
// Create (CRUD)
const addRide = (equipObj) => axios.post(`${baseUrl}/rides.json`, equipObj);
// Delete (CRUD)
const deleteRideById = (equipId) => axios.delete(`${baseUrl}/rides/${equipId}.json`);
// Retrieve by ID (CRUD)
const getRideById = (equipId) => axios.get(`${baseUrl}/rides/${equipId}.json`);
// Edit (CRUD)
const updateRide = (equipId, editedEquipObj) => axios.put(`${baseUrl}/rides/${equipId}.json`, editedEquipObj);

export default {
  getAllRides,
  addRide,
  deleteRideById,
  getRideById,
  updateRide,
};
