import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllEquipment = () => axios.get(`${baseUrl}/equipment.json`);

const deleteEquipById = (equipId) => axios.delete(`${baseUrl}/equipment/${equipId}.json`);

const getEquipById = (equipId) => axios.get(`${baseUrl}/equipment/${equipId}.json`);

export default {
  getAllEquipment,
  deleteEquipById,
  getEquipById,
};
