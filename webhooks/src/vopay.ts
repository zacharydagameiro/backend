// dependencies
import axios from "axios";
import sha1 from "sha1";
// local
import urls from "./config/urls.json";
import keys from "./config/keys.json";
// utils
import { getCurrentDate } from "./utils/getCurrentDate";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const db = getFirestore();

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
      `${urls.vopay}/account/webhook-url/info?AccountID=${keys.vopay.account_id}&Key=${keys.vopay.api}&Signature=${signature}&Type=transaction`,
      config
    )
    .then((resp) => {
      return axios
        .get(
          `${urls.vopay}/account/webhook-url/test?AccountID=${keys.vopay.account_id}&Key=${keys.vopay.api}&Signature=${signature}&Type=bankaccount`,
          config
        )
        .then((response) => {
          return res.send({ ...response.data, url: resp.data.WebHookURL });
        });
    });
}

export function webhook(req: any, res: any) {
  console.log(req.body);

  if (req.body.Success === false || req.body.Success === undefined) {
    return res.send("Error");
  }

  const transactionRef = db
    .collection("transactions")
    .doc(req.body.ID.toString());

  if (req.body.TransactionType === "funding")
    transactionRef.update({
      status: req.body.Status,
      updated: FieldValue.serverTimestamp(),
      amount: req.body.TransactionAmount,
    });

  return res.send("Hello from Firebase!");
}

// paylink
// {
//   >    Success: true,
//   >    ID: 48272,
//   >    Status: 'pending',
//   >    Module: 'paylink',
//   >    TransactionAmount: '93401.00',
//   >    TransactionType: 'paylink',
//   >    TransactionID: 61875,
//   >    UpdatedAt: '2023-01-22 18:27:29',
//   >    ValidationKey: 'dc4b13ccf50ccd1def313dbf44d7ed702d53f4ca',
//   >    Environment: 'Sandbox'
//   >  }

// transaction
// >  {
//   >    Success: true,
//   >    ID: 85296,
//   >    Status: 'bulkpayout',
//   >    Module: 'interac',
//   >    TransactionAmount: '25531.00',
//   >    ClientReferenceNumber: 'ABC1990777655',
//   >    TransactionType: 'interac',
//   >    TransactionID: 85296,
//   >    UpdatedAt: '2023-01-22 18:28:48',
//   >    ValidationKey: '0ee3c846bfee1a7d437dab903e9f4755871c0897',
//   >    Environment: 'Sandbox'
// functions: Beginning execution of "vopayWebhook"
// >  {
// >    Success: true,
// >    ID: 45559,
// >    Status: 'bulkpayout',
// >    Module: 'bulkpayout',
// >    TransactionAmount: '60328.00',
// >    ClientReferenceNumber: 'ABC900102403',
// >    TransactionType: 'bulkpayout',
// >    TransactionID: 45559,
// >    UpdatedAt: '2023-01-22 18:30:31',
// >    ValidationKey: 'a0a82961878a8dae7ae457abe76690bdd51fd5b8',
// >    Environment: 'Sandbox'
// >  }
// i  functions: Finished "vopayWebhook" in 1.028661ms
// i  functions: Finished "vopayTest" in 1167.497937ms
// i  functions: Beginning execution of "vopayTest"
// >  date
// >  HI
// i  functions: Beginning execution of "vopayWebhook"
// >  {
// >    Success: true,
// >    ID: 97111,
// >    Status: 'funding',
// >    Module: 'funding',
// >    TransactionAmount: '87446.00',
// >    ClientReferenceNumber: 'ABC1459454087',
// >    TransactionType: 'funding',
// >    TransactionID: 97111,
// >    UpdatedAt: '2023-01-22 18:30:34',
// >    ValidationKey: '15c10af4fdc4467442c3a46d4629e3a2ecf39ad5',
// >    Environment: 'Sandbox'
// >  }
// i  functions: Finished "vopayWebhook" in 1.052992ms
// i  functions: Finished "vopayTest" in 1169.507871ms
// i  functions: Beginning execution of "vopayTest"
// >  date
// >  HI
// i  functions: Beginning execution of "vopayWebhook"
// >  {
// >    Success: true,
// >    ID: 33691,
// >    Status: 'bulkpayout',
// >    Module: 'bulkpayout',
// >    TransactionAmount: '20254.00',
// >    ClientReferenceNumber: 'ABC781771796',
// >    TransactionType: 'bulkpayout',
// >    TransactionID: 33691,
// >    UpdatedAt: '2023-01-22 18:30:37',
// >    ValidationKey: '52102c0f3b7d3c326e0b3c542887b9354de779c2',
// >    Environment: 'Sandbox'
// >  }
// i  functions: Finished "vopayWebhook" in 0.625087ms
// i  functions: Finished "vopayTest" in 658.712084ms
// >  {
// >    Success: true,
// >    ID: 33691,
// >    Status: 'bulkpayout',
// >    Module: 'bulkpayout',
// >    TransactionAmount: '20254.00',
// >    ClientReferenceNumber: 'ABC781771796',
// >    TransactionType: 'bulkpayout',
// >    TransactionID: 33691,
// >    UpdatedAt: '2023-01-22 18:30:37',
// >    ValidationKey: '52102c0f3b7d3c326e0b3c542887b9354de779c2',
// >    Environment: 'Sandbox'
// >  }>  {
// >    Success: true,
// >    ID: 33691,
// >    Status: 'bulkpayout',
// >    Module: 'bulkpayout',
// >    TransactionAmount: '20254.00',
// >    ClientReferenceNumber: 'ABC781771796',
// >    TransactionType: 'bulkpayout',
// >    TransactionID: 33691,
// >    UpdatedAt: '2023-01-22 18:30:37',
// >    ValidationKey: '52102c0f3b7d3c326e0b3c542887b9354de779c2',
// >    Environment: 'Sandbox'
