import { getAuth } from "firebase-admin/auth";

const firAuth = getAuth();

const auth = async (req: Req, res: Res, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("auth/no-token");
  }
  try {
    // when emulating
    let claims;
    if (token.split("-")[0] === "test") {
      const userRecord = await firAuth.getUserByEmail(token.split("-")[1]);
      claims = userRecord.customClaims!;
      claims.uid = userRecord.uid;
      req.user = {
        claims,
      };
    } else {
      claims = await firAuth.verifyIdToken(token);
      req.user = {
        claims,
      };
    }

    next();
  } catch (ex: any) {
    console.log("Auth error: ", ex);
    if (ex.code === "auth/argument-error") {
      return res.status(401).send("auth/invalid-token");
    }
    return res.status(400).send(ex);
  }
};

module.exports = auth;
