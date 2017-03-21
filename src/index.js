import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase'

import Home from './Home';
import '../grunt-assets/css/main.css';



// Firebase

var config = {
  apiKey: "AIzaSyAT0X4891wdb-DCij7Zr93TNGih7dK3S8o",
  authDomain: "plate-project.firebaseapp.com",
  databaseURL: "https://plate-project.firebaseio.com",
  storageBucket: "plate-project.appspot.com",
  messagingSenderId: "551557789209"
};
const fire = firebase.initializeApp(config);

ReactDOM.render(
  <Home fire={fire} />,
  document.getElementById('root')
);
