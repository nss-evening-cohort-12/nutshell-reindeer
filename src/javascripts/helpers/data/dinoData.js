import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getDinos = () => axios.get(`${baseUrl}/dinosaurs.json`);

export default { getDinos };
