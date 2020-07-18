import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getEquips = () => axios.get(`${baseUrl}/equipment.json`);

export default { getEquips };
