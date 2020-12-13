import { Db, MongoClient } from "mongodb";
import * as config from "../config";

// const uri = mongodb://${config.mongo_user}:${config.mongo_secret}@${config.mongo_host}:${config.mongo_port}?authMechanism=DEFAULT;
const uri2 =
  "mongodb+srv://administrator:secret2.@cluster0.9buds.gcp.mongodb.net/dualbackN?retryWrites=true&w=majority";

const cl = new MongoClient(uri2, { useUnifiedTopology: true });
let database: Db;
cl.connect()
  .then(() => {
    database = cl.db(config.mongo_database);
  })
  .catch((err) => {
    throw err;
  });

export const client = (wantedCollection: string) => {
  return database.collection(wantedCollection);
};