const config = require("../server/config");
const { exec } = require("child_process");

exec(
  `docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=${config.mongo_user} -e MONGO_INITDB_ROOT_PASSWORD=${config.mongo_secret} mongo`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(
      `mongo db started, user: ${config.mongo_user}, secret: ${config.mongo_secret}: ${stdout}`
    );
  }
);
