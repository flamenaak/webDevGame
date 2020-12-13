import * as express from "express";
import * as bodyParser from "body-parser";
import apiRouter from "./api/routes";
import * as config from "./config";
import "./websocket";

const app = express();
app.get("/system/health", (req, res) => {
  res.send("ok");
});

app.use(bodyParser.json());
app.use("/api/v1", apiRouter);
app.listen(config.api_port);
