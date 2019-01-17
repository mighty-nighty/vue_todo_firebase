import firebase from 'firebase'
import 'firebase/firestore'
import fireConfig from './firebaseConfig'

const firebaseApi = firebase.initializeApp(fireConfig);
const firestore = firebaseApi.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

export default firestore
