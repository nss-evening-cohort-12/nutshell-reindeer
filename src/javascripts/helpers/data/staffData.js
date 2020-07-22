import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const deleteStaffById = (staffId) => axios.delete(`${baseUrl}/staff/${staffId}.json`);

const getStaffById = (staffId) => axios.get(`${baseUrl}/staff/${staffId}.json`);

const addStaff = (staffObj) => axios.post(`${baseUrl}/staff.json`, staffObj);

const updateStaff = (staffId, editedStaffObj) => axios.put(`${baseUrl}/staff/${staffId}.json`, editedStaffObj);

export default {
  getStaff,
  deleteStaffById,
  getStaffById,
  addStaff,
  updateStaff,
};
