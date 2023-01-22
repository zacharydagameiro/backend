import axios from "axios";
import sha1 from "sha1";
import urls from "../config/urls.json";
import keys from "../config/keys.json";
// utils
import { getCurrentDate } from "../utils/getCurrentDate";

import { getFirestore } from "firebase-admin/firestore";

export const depositACH = (ach: DepositRequest) => {
  console.log(ach);
};
const db = getFirestore();

export const fund = async (deposit: DepositRequest) => {
  // get default account from user

  const user = (await db.collection("users").doc(deposit.user).get()).data()!;
  const clientAccountID = (
    await db.collection("wallets").doc(user?.default_wallet).get()
  ).data()?.vid;

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

  // user params
  searchParams.set("ClientAccountID", clientAccountID);
  searchParams.set("FirstName", user.first_name);
  searchParams.set("LastName", user.last_name);

  // bank params
  searchParams.set("AccountNumber", user.bank.account_number);
  searchParams.set("FinancialInstitutionNumber", user.bank.institution_number);
  searchParams.set("BranchTransitNumber", user.bank.transit_number);

  // address
  searchParams.set("Address1", user.street);
  searchParams.set("City", user.city);
  searchParams.set("Province", user.province);
  searchParams.set("PostalCode", user.postal);
  searchParams.set("Country", "CA");

  searchParams.set("Amount", deposit.amount.toString());

  const response = await axios.post(
    `${urls.vopay}/eft/fund`,
    searchParams,
    config
  );

  if (response.data.Success === false) {
    console.log(response.data.ErrorMessage);
    throw new Error(response.data.ErrorMessage);
  }
  return response.data;
};

// export const withdrawACH = (deposit: DepositRequest) => {
