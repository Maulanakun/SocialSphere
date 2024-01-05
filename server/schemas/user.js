const { ObjectId } = require("mongodb");
const User = require("../models/user");

const typeDefs = `#graphql

    type User {
        _id: ID,
        name:String,
        username:String,
        email:String,
        password:String
    }

    input UserCreateInput{
        name:String,
        username:String,
        email:String,
        password:String
    }

    type Query {
        userLogin(username:String,password:String):responseLoginUser
        searchUser(username:String):ResponseSearchUser
        getUserById(id:ID):ResponseGetUserById
    }

    type Mutation {
        userRegist(input:UserCreateInput):ResponseCreateUser
    }
`;

const resolvers = {
  Query: {
    getUserById: async (_, { id }, context) => {
      await context.doAuthentication();
      let data = await User.findUserById(id);
      return {
        statusCode: 200,
        data: data[0],
        followers: data[0].followers,
        following: data[0].following,
      };
    },
    userLogin: async (_, args) => {
      const token = await User.login(args);
      return {
        statusCode: 200,
        message: "success to login",
        token: token,
      };
    },
    searchUser: async (_, args, context) => {
      await context.doAuthentication();

      const foundUser = await User.searchUser(args);
      return {
        statusCode: 200,
        message: "success to login",
        data: foundUser,
      };
    },
  },

  Mutation: {
    userRegist: async (_, args) => {
      console.log(args);
      const user = await User.Regist(args);
      return {
        statusCode: 200,
        message: "success to regist",
        data: user,
      };
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolver: resolvers,
};
