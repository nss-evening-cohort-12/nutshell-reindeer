import firebase from 'firebase/app';
import 'firebase/auth';

const checkUser = () => firebase.auth().currentUser;

export default { checkUser };
