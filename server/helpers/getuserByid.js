// context.js
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/db");

async function getUserById(userId) {
  const db = getDatabase();
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    return user;
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw new Error("Failed to get user details");
  }
}

module.exports = {
  getUserById,
  // Fungsi atau model lainnya
};
