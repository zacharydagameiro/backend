// dependencies

import * as functions from "firebase-functions";

var admin = require("firebase-admin");

import serviceAccount from "./config/firebase-service-account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ploutos-pay-backend-default-rtdb.firebaseio.com",
});

// vopay webhook functions
import { setup, webhook, test } from "./vopay";
export const vopaySetup = functions.https.onRequest(setup);
export const vopayWebhook = functions.https.onRequest(webhook);
export const vopayTest = functions.https.onRequest(test);
