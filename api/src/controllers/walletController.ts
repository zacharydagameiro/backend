// third party
import { getFirestore, FieldValue } from "firebase-admin/firestore";
// services
import createVopayWallet from "../services/vopay/createVopayWallet";
// utils
import { getCurrentDate } from "../utils/getCurrentDate";
import sha1 from "sha1";
import axios from "axios";
// config
import keys from "../config/keys.json";
import urls from "../config/urls.json";

const db = getFirestore();

export const createWallet = async (uid: UID, handle: string) => {
  console.log("MOOOO");
  const walletRef = db.collection("wallets").doc(handle);
  const userRef = db.collection("users").doc(uid);

  try {
    const user = (await userRef.get()).data() as User;

    if ((await walletRef.get()).exists) throw new Error("error/wallet-exists");

    let wallet: Wallet = {
      handle,
      owner: user,
      balance: 0,
      created_at: getCurrentDate(true),
    };
    const vopay_wid: WID = await createVopayWallet(wallet);
    console.log("vopay_wid", vopay_wid);
    await db.runTransaction(async (t) => {
      // create the wallet
      wallet.vid = vopay_wid;
      wallet.updated_at = getCurrentDate(true);
      delete wallet.owner;
      wallet.owner_uid = user.uid;
      t.set(walletRef, wallet);

      // update the user
      if (user.default_wallet) {
        t.update(userRef, {
          wallets: FieldValue.arrayUnion(handle),
        });
      } else {
        t.update(userRef, {
          default_wallet: handle,
          wallets: FieldValue.arrayUnion(handle),
        });
      }
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getWallets = async (user: any) => {
  const walletsQuery = db
    .collection("wallets")
    .where("owner_uid", "==", user.claims.uid);

  try {
    const walletDocs = await walletsQuery.get();
    const wallets = walletDocs.docs.map((doc) => doc.data());

    return wallets;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getBalance = async (wallet: Wallet) => {
  wallet.vid = (
    await db.collection("wallets").doc(wallet.handle!).get()
  ).data()!.vid as WID;

  console.log("wallet.vid", wallet.vid);

  const currentDate = getCurrentDate();
  const unsigned = `${keys.vopay.api}${keys.vopay.secret}${currentDate}`;
  const signature = sha1(unsigned);

  const searchParams = new URLSearchParams();
  searchParams.set("AccountID", keys.vopay.account_id);
  searchParams.set("Key", keys.vopay.api);
  searchParams.set("Signature", signature);

  searchParams.set("ClientAccountID", wallet.vid!);

  const response = await axios.get(
    `${urls.vopay}/account/client-accounts/balance?${searchParams.toString()}`
  );

  if (response.data.Success === false) {
    console.log(response.data.ErrorMessage);
    throw new Error(response.data.ErrorMessage);
  }

  const balance = response.data;
  return {
    balance: balance.AccountBalance,
    available: balance.AvailableFunds,
    pending: balance.PendingBalance,
    deposit: balance.SecurityDeposit,
  };
};
