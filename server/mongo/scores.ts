import { client } from "./client";
import { IScore } from "./types";

export const saveScore = async (score: IScore) => {
  const scores = client("scores");
  try {
    await scores.insertOne(score);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const scoresByUser = async (username: string): Promise<IScore[]> => {
  const scores = client("scores");
  try {
    const highScores = await scores.find({ username }).sort({ score: -1 });
    return await highScores.toArray();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const allScoresDescending = async (): Promise<IScore[]> => {
  const scores = client("scores");
  try {
    const highScores = await scores.find().sort({ score: -1 });
    return await highScores.toArray();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getHighscores = async (limit: number): Promise<IScore[]> => {
  const scores = client("scores");
  try {
    const highScores = await scores.find().sort({ score: -1 }).limit(limit);
    return await highScores.toArray();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
