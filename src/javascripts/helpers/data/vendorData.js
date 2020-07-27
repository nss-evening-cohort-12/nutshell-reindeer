import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getVendors = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/vendors.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getVendorsWithAssignees = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/vendors.json`)
    .then((vendors) => {
      axios.get(`${baseUrl}/staff.json`)
        .then((staffData) => {
          const staff = utils.convertFirebaseCollection(staffData.data);
          const allVendors = vendors.data;
          Object.keys(allVendors).forEach((vendor) => {
            allVendors[vendor].assignees = [];
          });
          staff.forEach((employee) => {
            if (employee.assignmentCategory === 'vendors') {
              allVendors[employee.assignedTo].assignees.push(employee);
            }
          });
          resolve(utils.convertFirebaseCollection(allVendors));
        })
        .catch((err) => reject(err));
    });
});

const addVendor = (vendorObj) => axios.post(`${baseUrl}/vendors.json`, vendorObj);

const deleteVendorById = (vendorId) => axios.delete(`${baseUrl}/vendors/${vendorId}.json`);

const getVendorById = (vendorId) => axios.get(`${baseUrl}/vendors/${vendorId}.json`);

const updateVendor = (vendorId, editedVendorObj) => axios.put(`${baseUrl}/vendors/${vendorId}.json`, editedVendorObj);

export default {
  getVendors, deleteVendorById, getVendorById, addVendor, updateVendor, getVendorsWithAssignees,
};
