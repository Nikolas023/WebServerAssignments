/*
Example .env file:
VITE_API_BASE_URL="http://localhost:3000/api/v1"
DATABASE_URL=postgres://username:password@localhost:5432/yourdbname
PORT=3000
*/
// server/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables from .env file

// Ensure DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not defined");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            require: true,
            rejectUnauthorized: false, // May need this for self-signed certificates
          }
        : false,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
