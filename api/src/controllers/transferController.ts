import axios from "axios";
import sha1 from "sha1";
import urls from "../config/urls.json";
import keys from "../config/keys.json";
// utils
import { getCurrentDate } from "../utils/getCurrentDate";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const db = getFirestore();

export const send = async (transfer: Transfer) => {
  let [debitor, creditor] = await Promise.all(
    [transfer.debitor, transfer.creditor].map(async (id) => {
      let default_wallet = id;
      if (id[0] === "$") {
        console.log(id);
        default_wallet = (
          await db.collection("users").where("username", "==", id).get()
        ).docs[0].data().default_wallet;
      } else if (id[0] !== "@") {
        return;
      }
      console.log(default_wallet);
      const vopayWallet = (
        await db.collection("wallets").doc(default_wallet).get()
      ).data()!.vid;
      return vopayWallet;
    })
  );

  const currentDate = getCurrentDate();
  const unsigned = `${keys.vopay.api}${keys.vopay.secret}${currentDate}`;
  const signature = sha1(unsigned);

  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
  };

  const searchParams = new URLSearchParams();
  searchParams.set("AccountID", keys.vopay.account_id);
  searchParams.set("Key", keys.vopay.api);
  searchParams.set("Signature", signature);

  searchParams.set("Amount", transfer.amount.toString());
  searchParams.set("DebitorClientAccountID", debitor);
  searchParams.set("RecipientClientAccountID", creditor);

  const response = await axios.post(
    `${urls.vopay}/account/transfer-to`,
    searchParams,
    config
  );
  if (response.data.Success === false) {
    // throw new Error(response.data.ErrorMessage);
    console.log(response.data.ErrorMessage);
  }
  console.log(response.data);
  return response.data;
};

export const request = (transfer: Transfer, initiator_uid: string) => {
  console.log(transfer);
};

export const accept = (transfer_id: string, initator_uid: string) => {};
