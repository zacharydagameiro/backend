const { getFirestore } = require("firebase-admin/firestore");

const db = getFirestore();

export default function authCreateWebhook(user) {
  const ref = db.collection("users").doc(user.uid).create(user);
}
