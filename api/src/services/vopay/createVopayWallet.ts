// third party
import axios from "axios";
import sha1 from "sha1";
// local
import urls from "../../config/urls.json";
import keys from "../../config/keys.json";
// utils
import { getCurrentDate } from "../../utils/getCurrentDate";

export default async function createVopayWallet(wallet: Wallet) {
  console.log("MOOOO");
  const currentDate = getCurrentDate();
  const unsigned = `${keys.vopay.api}${keys.vopay.secret}${currentDate}`;
  const signature = sha1(unsigned);

  // console.log(unsigned);
  // parse wallet for vopay
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

  searchParams.set("DOB", wallet.owner!.dob!);
  searchParams.set("SINLastDigits", wallet.owner!.sin!.slice(-4));
  searchParams.set("Currency", "CAD");
  searchParams.set("FirstName", wallet.owner!.first_name!);
  searchParams.set("LastName", wallet.owner!.last_name!);
  searchParams.set("EmailAddress", wallet.owner!.email!);
  searchParams.set("Address1", wallet.owner!.street!);
  searchParams.set("City", wallet.owner!.city!);
  searchParams.set("Province", wallet.owner!.province!);
  searchParams.set("Country", "CA");
  searchParams.set("PostalCode", wallet.owner!.postal!);

  const response = await axios.post(
    `${urls.vopay}/account/client-accounts/individual`,
    searchParams,
    config
  );
  return response.data.ClientAccountID;
}
