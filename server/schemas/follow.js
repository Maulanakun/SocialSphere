const { ObjectId } = require("mongodb");
const Follow = require("../models/follow");

const typeDefs = `#graphql
  type Follow {
    _id: ID!
    followingId: ID!
    followerId: ID!
    createdAt: String
    updatedAt: String
    userDetails: UserDetail # Field untuk menyimpan detail pengguna yang di-follow atau yang melakukan follow
  }

  type UserDetail {
    _id: ID
    username: String
    # ... tambahkan properti lain yang diperlukan
  }

  type Mutation {
    followUser(followingId: ID!): ResponseFollow
  }
`;

const resolvers = {
  Follow: {
    userDetails: async (parent, _, context) => {
      // Dapatkan detail pengguna berdasarkan parent.followingId atau parent.followerId
      const userId = parent.followingId || parent.followerId;
      const user = await context.getUserById(userId);
      return user;
    },
  },
  Mutation: {
    followUser: async (_, { followingId }, context) => {
      const loginInfo = await context.doAuthentication();
      const input = {
        followingId: loginInfo.id,
        followerId: new ObjectId(followingId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const following = await Follow.following(input);

      return {
        statusCode: 200,
        message: "success to follow",
        data: following,
      };
    },
  },
};

module.exports = {
  followTypeDefs: typeDefs,
  followResolvers: resolvers,
};
