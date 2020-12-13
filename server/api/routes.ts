import * as express from "express";
import { authRouter } from "./auth/";
import { scoresRouter } from "./scores/";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/scores", scoresRouter);

export default router;
