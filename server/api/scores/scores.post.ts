import * as express from "express";
import { saveScore } from "../../mongo/scores";
import { IScore } from "server/mongo/types";
import { notifyClientsOnHighscore } from "../../websocket";

const scoresPostRouter = express.Router();

const saveScoreHandler = async (
  req: express.Request,
  res: express.Response
) => {
  const scoreInput = req.body as IScore;
  scoreInput.createdAt = new Date();
  await saveScore(scoreInput)
    .then(() => {
      res.json({
        message: "Score saved successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
  await notifyClientsOnHighscore(scoreInput);
};

scoresPostRouter.post("", saveScoreHandler);

export { scoresPostRouter };
