import firebase from "firebase/app";
import "firebase/database"; // If using Firebase database

import Vue from 'vue'
import App from './App.vue'



firebase.database.enableLogging(true);

let app = "";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAWR5oRFAs6_B7FCr7A882Gf9R0dKGPK8o",
  authDomain: "musicrecs-d37a6.firebaseapp.com",
  databaseURL: "https://musicrecs-d37a6.firebaseio.com",
  projectId: "musicrecs-d37a6",
  storageBucket: "",
  messagingSenderId: "21696461868",
  appId: "1:21696461868:web:73476ee43763d343"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
