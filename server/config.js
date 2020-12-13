module.exports = {
  mongo_host: process.env.MONGO_HOST || "localhost",
  mongo_port: process.env.MONGO_PORT || 27017,
  mongo_database: process.env.MONGO_DB || "dualnback",
  mongo_user: process.env.MONGO_USER || "mongoadmin",
  mongo_secret: process.env.MONGO_SECRET || "secret",
  jwt_secret: "6sbLD1XYYv",
  api_port: 8080,
};
