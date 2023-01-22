// third party
const express = require("express");
// controllers
const walletController = require("../controllers/walletController");
// middleware
const auth = require("../middleware/auth");
import validate from "../middleware/validate";
// schemas
import { schema as createWalletSchema } from "../schemas/createWallet";
import { schema as getBalanceSchema } from "../schemas/getBalance";

const walletRouter = express.Router();
walletRouter.use(auth); // all wallets emdpoints require authentication

walletRouter.post(
  "/",
  validate(createWalletSchema),
  async (req: Req, res: Res) => {
    try {
      if (req.user!.claims.verified !== true) {
        throw new Error("error/user-not-verified");
      }
      await walletController.createWallet(
        req.user!.claims.uid,
        req.body.handle
      );
      return res.send("success/wallet-created");
    } catch (error: any) {
      return res.status(400).send(error.message as string);
    }
  }
);

walletRouter.get("/", async (req: Req, res: Res) => {
  try {
    const wallets = await walletController.getWallets(req.user);
    return res.send({ message: "success/wallets-found", wallets });
  } catch (error: any) {
    return res.status(400).send(error.message as string);
  }
});

walletRouter.get(
  "/balance",
  validate(getBalanceSchema),
  async (req: Req, res: Res) => {
    try {
      const wallet: Wallet = req.body;
      const balance = await walletController.getBalance(wallet);
      return res.send({ message: "success/balance-found", balance });
    } catch (error: any) {
      return res.status(400).send(error.message as string);
    }
  }
);

walletRouter.get("/:wallet_id", async (req: Req, res: Res) => {
  res.send("Getting wallet: " + req.params.wallet_id);
});

export default walletRouter;
