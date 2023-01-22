import axios from "axios";
import sha1 from "sha1";
import urls from "../config/urls.json";
import keys from "../config/keys.json";
// utils
import { getCurrentDate } from "../utils/getCurrentDate";

export const send = async (transfer: Transfer, initator_uid: string) => {
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
  searchParams.set("DebitorClientAccountID", transfer.debitor);
  searchParams.set("RecipientClientAccountID", transfer.creditor);

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
