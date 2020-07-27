import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';
import dinoData from './dinoData';
import rideData from './rideData';
import vendorData from './vendorData';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const deleteStaffById = (staffId) => axios.delete(`${baseUrl}/staff/${staffId}.json`);

const getStaffById = (staffId) => axios.get(`${baseUrl}/staff/${staffId}.json`);

// const getAssignment = (category, assignedTo) => (assignedTo !== '' ? axios.get(`${baseUrl}/${category}/${assignedTo}.json`) : '');

const getStaffWithAssignments = () => new Promise((resolve, reject) => {
  getStaff()
    .then((allStaff) => {
      dinoData.getDinos()
        .then((dinos) => {
          rideData.getAllRides()
            .then((rides) => {
              vendorData.getVendors()
                .then((vendors) => {
                  const staffWithAssignments = [];
                  const allDepartments = {
                    dinosaurs: [...dinos],
                    rides: [...rides],
                    vendors: [...vendors],
                  };
                  // loop over each employee:
                  allStaff.forEach((employee) => {
                  // create staffMember object and add empty assignment object:
                    const staffMember = { assignment: {}, ...employee };
                    // find employee's assignment (if there is one):
                    if (employee.assignedTo) {
                      // find employee's assignment and add that as an object to staffMember
                      const assignment = allDepartments[employee.assignmentCategory].filter((item) => item.id === employee.assignedTo);
                      staffMember.assignment = { ...assignment[0] };
                    }
                    // push staffMember into the staffWithAssignments array
                    staffWithAssignments.push(staffMember);
                  });
                  resolve(staffWithAssignments);
                })
                .catch(((err) => { reject(err); }));
            });
        });
    });
});

const addStaff = (staffObj) => axios.post(`${baseUrl}/staff.json`, staffObj);

const updateStaff = (staffId, editedStaffObj) => axios.put(`${baseUrl}/staff/${staffId}.json`, editedStaffObj);

export default {
  getStaff, deleteStaffById, getStaffById, addStaff, updateStaff, getStaffWithAssignments,
};
