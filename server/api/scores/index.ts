import * as express from "express";
import { scoresGetRouter } from "./scores.get";
import { scoresPostRouter } from "./scores.post";

const scoresRouter = express.Router();

scoresRouter.use("", scoresGetRouter, scoresPostRouter);

export { scoresRouter };
