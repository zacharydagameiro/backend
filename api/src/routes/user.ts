// services and integrations
const express = require("express");

// middleware
const auth = require("../middleware/auth");

// controllers
const usersController = require("../controllers/usersController");

// utils
import validate from "../middleware/validate";

// types
import { Request, Response } from "express";
// import { User } from "../../../interfaces/User";

// schemas
import { schema as createUserSchema } from "../schemas/createUser";
import { schema as deleteUserSchema } from "../schemas/deleteUser";
import { schema as onboardUserSchema } from "../schemas/onboardUser";
import { schema as updateBankSchema } from "../schemas/updateBank";

const userRouter = express.Router();
// userRouter.use(auth);

userRouter.post(
  "/kyc",
  auth,
  validate(onboardUserSchema),
  async (req: Req, res: Res) => {
    try {
      const user: User = req.body as User;
      user.uid = req.user!.claims.uid;
      await usersController.kyc(user);
      return res.status(201).send("success/user-onboarded");
    } catch (error: any) {
      console.log(error);
      return res.status(400).send({ body: error.message as string });
    }
  }
);

userRouter.post(
  "/update/bank",
  validate(updateBankSchema),
  auth,
  async (req: Req, res: Res) => {
    try {
      const bank: BankDetails = req.body as BankDetails;
      await usersController.updateBank(req.user, bank);
      return res.status(201).send("success/user-banks-updated");
    } catch (error: any) {
      console.log(error);
      return res.status(400).send({ body: error.message as string });
    }
  }
);

userRouter.post("/login", async (req: Req, res: Res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const token = await usersController.login(email, password);
    return res.status(200).send(token);
  } catch (error: any) {
    return res.status(400).send({ body: error.message as string });
  }
});

userRouter.post(
  "/",
  validate(createUserSchema),
  async (req: Request, res: Response) => {
    try {
      const user: User = req.body as User;
      await usersController.createUser(user);
      return res.status(201).send("success/user-created");
    } catch (error: any) {
      return res.status(403).send(error.message as string);
    }
  }
);

userRouter.get("/", auth, async (req: Req, res: Response) => {
  try {
    const user = await usersController.getUser(req.user!.claims.uid);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(400).send(error.message as string);
  }
});

userRouter.delete(
  "/:uid",
  auth,
  validate(deleteUserSchema),
  async (req: Req, res: Response) => {
    try {
      usersController.deleteUser(req.params.uid);
      res.status(200).send("success/user-deleted");
    } catch (error: any) {
      res.status(400).send(error.message as string);
    }
  }
);

// userRouter.use(auth); // all user endpoints beyond here require authentication

export default userRouter;
