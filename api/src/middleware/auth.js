import { getAuth } from "firebase-admin/auth";

const firAuth = getAuth();

const auth = async (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).send("auth/no-token");
  }
  try {
    // when emulating
    let claims;
    if (token === "test") {
      const userRecord = await firAuth.getUserByEmail(
        "zacharydagameiro@icloud.com"
      );
      claims = userRecord.customClaims;
      req.user = {
        claims,
        uid: userRecord.uid,
      };
    } else {
      claims = await firAuth.verifyIdToken(token);
      req.user = {
        claims,
      };
    }

    next();
  } catch (ex) {
    console.log("Auth error: ", ex);
    if (ex.code === "auth/argument-error") {
      return res.status(401).send("auth/invalid-token");
    }
    return res.status(400).send(ex);
  }
};

module.exports = auth;
