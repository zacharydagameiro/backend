// third party
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
// types
// import { User } from "../../../interfaces/User";

const auth = getAuth();
const db = getFirestore();

export const createUser = async (user: User) => {
  console.log("1", user);
  try {
    const userRecord = await auth.createUser({
      email: user.email,
      password: user.password,
    });

    console.log("2", userRecord);
    user.uid = userRecord.uid;
    user.tier = "free";
    user.created_at = new Date().toISOString();
    user.updated_at = new Date().toISOString();
    console.log("3", user);
    delete user.password;
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error);
  }
  console.log("4", user);
  // create user document in firestore
  const ref = db.collection("users").doc(user.uid);
  try {
    await ref.create(user);
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error);
  }
};

// export const login = async (email: string, password: string) => {
//   try {
//     const userRecord = await auth.getUserByEmail(email);
//     console.log("userRecord", userRecord);
//     const token = await auth.createCustomToken(userRecord.uid);
//     return token;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

export const updateBank = async (user: User, bank: BankDetails) => {
  await db.collection("users").doc(user.uid!).update({
    bank: bank,
    updated_at: new Date().toISOString(),
  });
};

export const deleteUser = async (uid: string) => {
  try {
    await auth.deleteUser(uid);
  } catch (error: any) {
    throw new Error(error);
  }

  // delete user document in firestore
  const ref = db.collection("users").doc(uid);
  try {
    await ref.delete();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUser = async (uid: string) => {
  const ref = db.collection("users").doc(uid);
  try {
    const doc = await ref.get();
    if (doc.exists) {
      return doc.data();
    } else {
      throw new Error("error/user-not-found");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const kyc = async (user: User) => {
  console.log("1", user);
  const ref = db.collection("users").doc(user.uid!);
  try {
    await ref.update({ ...user, updated_at: new Date().toISOString() });
    await auth.setCustomUserClaims(user.uid!, { verified: true });
  } catch (error: any) {
    console.log("error", error);
    throw new Error(error);
  }
};
