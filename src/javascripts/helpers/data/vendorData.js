import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getVendors = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/vendors.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const addVendor = (vendorObj) => axios.post(`${baseUrl}/vendors.json`, vendorObj);

const deleteVendorById = (vendorId) => axios.delete(`${baseUrl}/vendors/${vendorId}.json`);

const getVendorById = (vendorId) => axios.get(`${baseUrl}/vendors/${vendorId}.json`);

const updateVendor = (vendorId, editedVendorObj) => axios.put(`${baseUrl}/vendors/${vendorId}.json`, editedVendorObj);

export default {
  getVendors,
  deleteVendorById,
  getVendorById,
  addVendor,
  updateVendor,
};
