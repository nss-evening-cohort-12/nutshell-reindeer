import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllRides = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getRidesWithAssignees = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides.json`)
    .then((rides) => {
      axios.get(`${baseUrl}/staff.json`)
        .then((staffData) => {
          const staff = utils.convertFirebaseCollection(staffData.data);
          const allRides = rides.data;
          Object.keys(allRides).forEach((ride) => {
            allRides[ride].assignees = [];
          });
          staff.forEach((employee) => {
            if (employee.assignmentCategory === 'rides') {
              allRides[employee.assignedTo].assignees.push(employee);
            }
          });
          resolve(utils.convertFirebaseCollection(allRides));
        })
        .catch((err) => reject(err));
    });
});

const addRide = (equipObj) => axios.post(`${baseUrl}/rides.json`, equipObj);

const deleteRideById = (equipId) => axios.delete(`${baseUrl}/rides/${equipId}.json`);

const getRideById = (equipId) => axios.get(`${baseUrl}/rides/${equipId}.json`);

const updateRide = (equipId, editedEquipObj) => axios.put(`${baseUrl}/rides/${equipId}.json`, editedEquipObj);

const patchRide = (rideId, addedRideObj) => axios.patch(`${baseUrl}/rides/${rideId}.json`, addedRideObj);

export default {
  getAllRides,
  addRide,
  deleteRideById,
  getRideById,
  updateRide,
  patchRide,
  getRidesWithAssignees,
};
