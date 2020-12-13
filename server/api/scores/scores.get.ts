import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middlewares/jwt";
import { scoresByUser, allScoresDescending } from "../../mongo/scores";

const scoresGetRouter = Router();

const allScoresHandler = async (req: Request, res: Response) => {
  await allScoresDescending()
    .then((scores) => {
      res.json(scores);
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

const scoresByUserHandler = async (req: Request, res: Response) => {
  await scoresByUser(req.user?.userName || "")
    .then((scores) => {
      res.json(scores);
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

scoresGetRouter.get("/", allScoresHandler);
scoresGetRouter.get("/me", authMiddleware, scoresByUserHandler);

export { scoresGetRouter };
