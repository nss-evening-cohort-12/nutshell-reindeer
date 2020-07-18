import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getDinos = () => axios.get(`${baseUrl}/dinosaurs.json`);

const addDino = (dinoObj) => axios.post(`${baseUrl}/dinosaurs.json`, dinoObj);

export default { getDinos, addDino };
