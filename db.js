require("dotenv").config();

module.exports = {
  DB: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
    process.env.DB_ADRESS
  }/${process.env.DB_NAME}`
};
