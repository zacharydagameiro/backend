import * as functions from "firebase-functions";
// import { initializeApp } from "firebase-admin/app";

// initializeApp();

var admin = require("firebase-admin");

import serviceAccount from "./config/firebase-service-account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ploutos-pay-backend-default-rtdb.firebaseio.com",
});

import { api } from "./api";
export const apiHandler = functions.https.onRequest(api);
