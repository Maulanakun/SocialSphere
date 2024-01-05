const { ObjectId } = require("mongodb");
const Post = require("../models/post");

const typeDefs = `#graphql
type UserDetails {
  _id: ID
  username: String
}

type Comment {
  text: String
  userDetails: UserDetails
}

type Like {
  _id: ID
  userDetails: UserDetails
}

type Post {
  _id: ID
  content: String
  tags: [String]
  imgUrl: String
  authorId: ID
  comments: [Comment]
  likes: [Like]
  createdAt: String
  updatedAt: String
}

  input InputPost {
    content: String
    tags: [String]
    imgUrl: String
  }
  type Query {
    getPost:ResponseGetPost
    getPostById(_id:ID):ResponseGetPostById
  }

  type Mutation {
    addPost(input: InputPost): ResponseAddPost
    addComment(_id:ID!,text:String):ResponseAddPost
    likePost(_id: ID!): ResponseAddPost
  }
`;

const resolvers = {
  Query: {
    getPostById: async (_, { _id }, context) => {
      await context.doAuthentication();
      let data = await Post.getPostById(_id);
      // console.log(data);
      let result = {
        _id: new ObjectId(data._id),
        content: data.content,
        imgUrl: data.imgUrl,
        authorId: new ObjectId(data.authorId),
        comments: data.comments[0].userDetails,
        likes: data.likes[0].userDetails,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
      console.log(result, "<<<<<<<<<<<<<<<<<");
      return {
        statusCode: 200,
        data: result,
      };
    },
    getPost: async (_, __, context) => {
      await context.doAuthentication();
      let data = await Post.getPost();
      console.log(data[1]);
      return {
        statusCode: 200,
        data: data,
      };
    },
  },
  Mutation: {
    likePost: async (_, { _id }, context) => {
      const userInfo = await context.doAuthentication();
      await Post.addLike(_id, userInfo);
      return {
        statusCode: 200,
        message: "success to add Like",
      };
    },
    addComment: async (_, { _id, text }, context) => {
      const userInfo = await context.doAuthentication();

      const updatedPost = await Post.addComment(_id, text, userInfo);

      return {
        statusCode: 200,
        message: "success to add comment",
      };
    },
    addPost: async (_, { input }, context) => {
      const loginInfo = await context.doAuthentication();
      const data = {
        content: input.content,
        tags: input.tags,
        imgUrl: input.imgUrl,
        authorId: loginInfo.id,
        comments: [],
        likes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await Post.addPost(data);
      return {
        statusCode: 200,
        message: "success to add post",
      };
    },
  },
};

module.exports = {
  postTypeDefs: typeDefs,
  postResolvers: resolvers,
};
