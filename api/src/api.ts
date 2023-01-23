const express = require("express");
const cors = require("cors");
// api setup
export const api = express();
api.use(cors({ origin: true }));
api.use(express.json());

// users
import userRouter from "./routes/user";
api.use("/user", userRouter);

// // wallet
import walletRouter from "./routes/wallet";
api.use("/wallet", walletRouter);

// // transfers
import transferRouter from "./routes/transfer";
api.use("/transfer", transferRouter);

// daws
import dawsRouter from "./routes/daws";
api.use("/daws", dawsRouter);
