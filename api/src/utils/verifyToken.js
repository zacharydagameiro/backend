const { getAuth } = require("firebase-admin/auth");

const auth = getAuth();
// auth.verifyIdToken(token);

const verifyToken = async (token) => {
  try {
    console.log("verifyToken");
    console.log(token);
    const res = await auth.verifyIdToken;
    return res;
  } catch (err) {
    throw err;
  }
};

module.exports = verifyToken;
