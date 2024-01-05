const { getDatabase } = require("../config/db");
const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");

class Follow {
  static collection() {
    return getDatabase().collection("follows");
  }

  static async following(input) {
    try {
      const result = await this.collection().insertOne(input);
      const follow = await this.collection().findOne({
        _id: result.insertedId,
      });
      return follow;
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
}

module.exports = Follow;
