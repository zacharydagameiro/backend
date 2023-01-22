// third party
const express = require("express");
// const auth = require("../middleware/auth");
// utils
import validate from "../middleware/validate";
// controllers
const transferController = require("../controllers/transferController");
// schemas
import { schema as sendTransferSchema } from "../schemas/sendTransfer";
import { schema as requestTransferSchema } from "../schemas/requestTransfer";
import { schema as acceptTransferSchema } from "../schemas/acceptTransfer";
// types
import { Response } from "express";

const transferRouter = express.Router();
// transferRouter.use(auth); // all transfers emdpoints require authentication

// send money
transferRouter.post(
  "/send",
  validate(sendTransferSchema),
  async (req: Req, res: Response) => {
    try {
      transferController.send(req.body, "req.auth.uid");
      res.status(201).send("success/transfer-sent");
    } catch (error: any) {
      res.status(400).send(error.message as string);
    }
  }
);
// request money
transferRouter.post(
  "/request",
  validate(requestTransferSchema),
  async (req: Req, res: Response) => {
    try {
      transferController.request(req.body, "req.auth.uid");
      res.status(201).send("success/transfer-request-sent");
    } catch (error: any) {
      res.status(400).send(error.message as string);
    }
  }
);
// accept request
transferRouter.post(
  "/request/accept/:transfer_id",
  validate(acceptTransferSchema),
  async (req: Req, res: Response) => {
    try {
      transferController.accept(req.params.transfer_id, "req.auth.uid");
      res.status(201).send("success/transfer-accepted");
    } catch (error: any) {
      res.status(400).send(error.message as string);
    }
  }
);

export default transferRouter;
