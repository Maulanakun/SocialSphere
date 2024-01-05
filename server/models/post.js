const { getDatabase } = require("../config/db");
const { GraphQLError } = require("graphql");
const { ObjectId } = require("mongodb");

class Post {
  static collection() {
    const database = getDatabase();
    const postCollection = database.collection("posts");
    return postCollection;
  }
  static async addPost(input) {
    try {
      const result = await this.collection().insertOne(input);
      console.log(result);
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
  static async getPost() {
    try {
      const result = await this.collection()
        .find({ createdAt: { $exists: true, $ne: null } })
        .sort({ createdAt: -1 })
        .toArray();
      return result;
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
  static async userDetail(id) {
    try {
      const userCollection = getDatabase().collection("users");
      const foundUser = await userCollection.findOne(
        { _id: id },
        {
          projection: {
            _id: 1,
            username: 1,
          },
        }
      );
      return foundUser;
    } catch (error) {
      throw new GraphQLError(error);
    }
  }
  static async addComment(postId, comment, userInfo) {
    try {
      let userDetail = await this.userDetail(userInfo.id);
      const result = await this.collection().updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: { text: comment, userDetails: userDetail } } } // Memastikan struktur yang sesuai
      );

      if (result.modifiedCount === 0) {
        throw new GraphQLError("Failed to add comment");
      }
    } catch (error) {
      console.error("Error in addComment:", error);
      throw new GraphQLError("Failed to add comment");
    }
  }
  static async addLike(postId, userInfo) {
    try {
      let userDetail = await this.userDetail(userInfo.id);
      const userDetails = {
        _id: userDetail._id,
        userDetails: {
          id: userDetail._id,
          username: userDetail.username,
        },
      };
      const result = await this.collection().updateOne(
        { _id: new ObjectId(postId) },
        {
          $addToSet: {
            likes: {
              userDetails,
            },
          },
        } // Memastikan struktur yang sesuai
      );
      if (result.matchedCount === 0) {
        console.error(`No post found with ID ${postId}`);
        throw new GraphQLError(`No post found with ID ${postId}`);
      } else if (result.modifiedCount === 0) {
        console.error(
          `Post with ID ${postId} has already been liked by this user`
        );
        throw new GraphQLError(
          `Post with ID ${postId} has already been liked by this user`
        );
      }
    } catch (error) {
      console.error("Error in addLike:", error);
      throw new GraphQLError("Failed to add Like");
    }
  }
  static async getPostById(postId) {
    try {
      const postAggregation = await this.collection()
        .aggregate([
          { $match: { _id: new ObjectId(postId) } },
          {
            $lookup: {
              from: "users",
              let: {
                authorId: "$authorId",
                commentUserIds: "$comments.user",
                likeUserIds: "$likes.user",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $or: [
                        { $eq: ["$_id", "$$authorId"] },
                        { $in: ["$_id", "$$commentUserIds"] },
                        { $in: ["$_id", "$$likeUserIds"] },
                      ],
                    },
                  },
                },
                {
                  $project: {
                    _id: 1,
                    username: 1,
                  },
                },
              ],
              as: "userDetails",
            },
          },
          {
            $addFields: {
              authorDetails: { $arrayElemAt: ["$userDetails", 0] },
              "comments.userDetails": {
                $map: {
                  input: "$comments",
                  as: "comment",
                  in: {
                    text: "$$comment.text",
                    userDetails: {
                      $arrayElemAt: [
                        "$userDetails",
                        {
                          $indexOfArray: ["$userDetails._id", "$$comment.user"],
                        },
                      ],
                    },
                  },
                },
              },
              "likes.userDetails": {
                $map: {
                  input: "$likes",
                  as: "like",
                  in: {
                    $arrayElemAt: [
                      "$userDetails",
                      {
                        $indexOfArray: ["$userDetails._id", "$$like.user"],
                      },
                    ],
                  },
                },
              },
            },
          },
          {
            $project: {
              content: 1,
              tags: 1,
              imgUrl: 1,
              authorId: 1,
              authorDetails: { _id: 1, username: 1 },
              comments: {
                $map: {
                  input: "$comments",
                  as: "comment",
                  in: {
                    text: "$$comment.text",
                    userDetails: "$$comment.userDetails",
                  },
                },
              },
              likes: {
                $map: {
                  input: "$likes",
                  as: "like",
                  in: { _id: "$$like._id", userDetails: "$$like.userDetails" },
                },
              },
              createdAt: 1,
              updatedAt: 1,
            },
          },
        ])
        .toArray();

      return postAggregation[0] || null;
    } catch (error) {
      console.error("Error in getPostById:", error);
      throw new GraphQLError("Failed to get post details");
    }
  }
}

module.exports = Post;
