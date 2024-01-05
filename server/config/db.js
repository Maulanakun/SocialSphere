require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
const dbName = "db_socialSphere";

async function connect() {
  try {
    await client.connect();
    console.log("success to connect mongodb");
    return client;
  } catch (error) {
    console.log(error);
    await client.close();
  }
}

function getDatabase() {
  return client.db(dbName);
}

module.exports = {
  connect,
  getDatabase,
};
