// dependencies
import * as functions from "firebase-functions";

// vopay webhook functions
import { setup, webhook, test } from "./vopay";
export const vopaySetup = functions.https.onRequest(setup);
export const vopayWebhook = functions.https.onRequest(webhook);
export const vopayTest = functions.https.onRequest(test);
