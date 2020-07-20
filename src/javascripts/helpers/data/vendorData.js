import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

// Retrieve (CRUD)
const getAllVendors = () => axios.get(`${baseUrl}/vendors.json`);
// Create (CRUD)
const addVendor = (vendorObj) => axios.post(`${baseUrl}/vendors.json`, vendorObj);
// Delete (CRUD)
const deleteVendorById = (vendorId) => axios.delete(`${baseUrl}/vendors/${vendorId}.json`);
// Retrieve by ID (CRUD)
const getVendorById = (vendorId) => axios.get(`${baseUrl}/vendors/${vendorId}.json`);
// Edit (CRUD)
const updateVendor = (vendorId, editedVendorObj) => axios.put(`${baseUrl}/vendors/${vendorId}.json`, editedVendorObj);

export default {
  getAllVendors,
  deleteVendorById,
  getVendorById,
  addVendor,
  updateVendor,
};
