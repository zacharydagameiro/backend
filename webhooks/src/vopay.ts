// dependencies
import axios from "axios";
import sha1 from "sha1";
// local
import urls from "./config/urls.json";
import keys from "./config/keys.json";
// utils
import { getCurrentDate } from "./utils/getCurrentDate";

export function setup(req: any, res: any) {
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

  searchParams.set("WebHookUrl", urls.vopay_webhook);

  return axios
    .post(`${urls.vopay}/account/webhook-url`, searchParams, config)
    .then((response) => {
      return res.send(response.data);
    });
}

export function test(req: any, res: any) {
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

  return axios
    .get(
      `${urls.vopay}/account/webhook-url/test?AccountID=${keys.vopay.account_id}&Key=${keys.vopay.api}&Signature=${signature}&Type=transaction`,
      config
    )
    .then((response) => {
      return res.send(response.data);
    });
}

export function webhook(req: any, res: any) {
  console.log(req.body);

  return res.send("Hello from Firebase!");
}

const handleFunding = async () => {
  // notify the client app of updated funds using the firebase cloud messaging api
};
