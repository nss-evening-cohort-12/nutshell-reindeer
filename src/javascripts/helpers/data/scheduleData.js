import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getSchedule = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/schedule.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const addSchedule = (schedObj) => axios.post(`${baseUrl}/schedule.json`, schedObj);

const deleteScheduleById = (schedId) => axios.delete(`${baseUrl}/schedule/${schedId}.json`);

const getScheduleById = (schedId) => axios.get(`${baseUrl}/schedule/${schedId}.json`);

const updateSchedule = (schedId, editedSchedObj) => axios.put(`${baseUrl}/schedule/${schedId}.json`, editedSchedObj);

const patchSchedule = (schedId, addedSchedObj) => axios.patch(`${baseUrl}/schedule/${schedId}.json`, addedSchedObj);

export default {
  getSchedule,
  addSchedule,
  deleteScheduleById,
  getScheduleById,
  updateSchedule,
  patchSchedule,
};
