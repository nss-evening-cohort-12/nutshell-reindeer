import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getStaff = () => axios.get(`${baseUrl}/staff.json`);

const deleteStaffById = (staffId) => axios.delete(`${baseUrl}/staff/${staffId}.json`);

const getStaffById = (staffId) => axios.get(`${baseUrl}/satff/${staffId}.json`);

const addStaff = (staffObj) => axios.post(`${baseUrl}/staff.json`, staffObj);

export default {
  getStaff,
  deleteStaffById,
  getStaffById,
  addStaff,
};
