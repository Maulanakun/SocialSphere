const { getDatabase } = require("../config/db");
const { GraphQLError } = require("graphql");
const { hash, compHash } = require("../helpers/bcryptjs");
const { ObjectId } = require("mongodb");
const { signToken } = require("../helpers/jwt");

class User {
  static collection() {
    const database = getDatabase();
    const userCollection = database.collection("users");
    return userCollection;
  }
  static async Regist(args) {
    try {
      const userCollection = this.collection();
      const hashPasword = hash(args.input.password);
      const newUser = await userCollection.insertOne({
        name: args.input.name,
        username: args.input.username,
        email: args.input.email,
        password: hashPasword,
      });

      const user = await userCollection.findOne(
        {
          _id: new ObjectId(newUser.insertedId),
        },
        {
          projection: {
            password: 0,
          },
        }
      );
      return user;
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
  static async login(args) {
    try {
      const userCollection = this.collection();
      const foundUser = await userCollection.findOne({
        username: args.username,
      });
      const validatePassword = compHash(args.password, foundUser.password);
      if (!foundUser || !validatePassword) {
        throw new GraphQLError("invalid login");
      }

      const payload = {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
      };

      const token = signToken(payload);
      return token;
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
  static async searchUser(args) {
    try {
      const userCollection = this.collection();
      const users = await userCollection
        .find(
          { username: { $regex: args.username } },
          {
            projection: {
              password: 0,
            },
          }
        )
        .toArray();
      if (users.length > 0) {
        console.log("Users found:", users);
        return users;
      } else {
        console.log("No users found with the specified username.");
        return [];
      }
    } catch (error) {
      console.log(error);
      throw new GraphQLError(error);
    }
  }
  static async findOne({ username }) {
    try {
      const userCollection = this.collection();
      return userCollection.findOne({ username });
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
  static async findUserById(userId) {
    try {
      return await User.collection()
        .aggregate([
          { $match: { _id: new ObjectId(userId) } },
          {
            $lookup: {
              from: "follows",
              localField: "_id",
              foreignField: "followerId",
              as: "followers",
            },
          },
          {
            $lookup: {
              from: "follows",
              localField: "_id",
              foreignField: "followingId",
              as: "following",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "followers.followingId",
              foreignField: "_id",
              as: "followerDetails",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "following.followerId",
              foreignField: "_id",
              as: "followingDetails",
            },
          },
          {
            $project: {
              username: 1,
              email: 1,
              followers: {
                $map: {
                  input: "$followerDetails",
                  as: "fd",
                  in: {
                    _id: "$$fd._id",
                    username: "$$fd.username",
                  },
                },
              },
              following: {
                $map: {
                  input: "$followingDetails",
                  as: "fd",
                  in: {
                    _id: "$$fd._id",
                    username: "$$fd.username",
                  },
                },
              },
            },
          },
        ])
        .toArray();
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
}
module.exports = User;
