import { getHighscores } from "./mongo/scores";
import * as WebSocket from "ws";
import { IScore } from "./mongo/types";

const publicScoresLimit = 250;

const wss = new WebSocket.Server({ port: 8081 });
wss.on("connection", async (ws: WebSocket) => {
  const scores = await getHighscores(publicScoresLimit);
  ws.send(JSON.stringify(scores));
});

export const notifyClientsOnHighscore = async (score: IScore) => {
  const highscores = await getHighscores(publicScoresLimit);
  if (score.score > highscores[highscores.length - 1].score) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(highscores));
      }
    });
  }
};
