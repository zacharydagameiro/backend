// third party
const express = require("express");
// middleware
const auth = require("../middleware/auth");
import validate from "../middleware/validate";
import { schema as achDepositSchema } from "../schemas/achDeposit";
// controllers
import { fund } from "../controllers/dawsController";

const dawsRouter = express.Router();
dawsRouter.use(auth);

dawsRouter.post(
  "/fund",
  validate(achDepositSchema),
  async (req: Req, res: Res) => {
    console.log("FUNDING ACCOUNT");
    try {
      const deposit: DepositRequest = req.body;
      deposit.user = req.user?.claims.uid!;
      await fund(deposit);
      res.status(200).send("OK");
    } catch (error) {
      console.log(error);
      res.status(500).send("daws/fund-failed");
    }
  }
);

export default dawsRouter;
