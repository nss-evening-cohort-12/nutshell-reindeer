import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getDinos = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinosaurs.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const addDino = (dinoObj) => axios.post(`${baseUrl}/dinosaurs.json`, dinoObj);

const deleteDinosById = (dinoId) => axios.delete(`${baseUrl}/dinosaurs/${dinoId}.json`);

const getDinoById = (dinoId) => axios.get(`${baseUrl}/dinosaurs/${dinoId}.json`);

const updateDino = (dinoId, editedDinoObj) => axios.put(`${baseUrl}/dinosaurs/${dinoId}.json`, editedDinoObj);

const getDinosWithHandlers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinosaurs.json`)
    .then((dinos) => {
      axios.get(`${baseUrl}/staff.json`)
        .then((staffData) => {
          const staff = utils.convertFirebaseCollection(staffData.data);
          const allDinos = dinos.data;
          Object.keys(allDinos).forEach((dino) => {
            allDinos[dino].assignees = [];
          });
          staff.forEach((employee) => {
            if (employee.assignmentCategory === 'dinosaurs') {
              allDinos[employee.assignedTo].assignees.push(employee);
            }
          });
          resolve(utils.convertFirebaseCollection(allDinos));
        })
        .catch((err) => reject(err));
    });
});

export default {
  getDinos, addDino, deleteDinosById, getDinoById, updateDino, getDinosWithHandlers,
};
