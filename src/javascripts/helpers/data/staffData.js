import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getStaff = () => axios.get(`${baseUrl}/staff.json`);

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
