import * as functions from "firebase-functions";
import axios from "axios";

import keys from "./config/keys.json";

export const generate_link_token = functions.https.onRequest(
  async (request, response) => {
    const uid = request.body.uid;

    const requestData = {
      client_id: keys.client_id,
      secret: keys.secret,
      user: {
        client_user_id: uid,
      },
      client_name: "Plaid Test App",
      products: ["auth", "transactions"],
      country_codes: ["US"],
      language: "en",
      account_filters: {
        depository: {
          account_subtypes: ["checking"],
        },
      },
    };

    try {
      const { data } = await axios.post(
        "https://sandbox.plaid.com/link/token/create",
        requestData
      );
      response.send(data.link_token);
    } catch (error: any) {
      console.log(error.response.data);
      response.send("error/could-not-generate-link-token");
    }
  }
);

export const webhook = functions.https.onRequest(async (request, response) => {
  console.log(request.body);
  response.send("success");
});
