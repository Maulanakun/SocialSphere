const typeDefs = `#graphql
  interface Response {
    statusCode: Int!
    message: String
    error: String
  }

  type responseLoginUser implements Response {
    statusCode: Int!
    message: String
    error: String
    token:String
  }

  type ResponseCreateUser implements Response {
    statusCode: Int!,
    message: String,
    error: String,
    data: User
  }
  type ResponseSearchUser implements Response {
    statusCode: Int!,
    message: String,
    error: String,
    data: [User]
  }
  type ResponseAddPost implements Response {
    statusCode: Int!,
    message: String,
    error: String,
  }
  type ResponseGetPost implements Response {
    statusCode: Int!,
    message: String,
    error: String,
    data: [Post]
  }

  type ResponseFollow implements Response {
    statusCode: Int!,
    message: String,
    error: String,
    data: Follow
  }
  type ResponseGetPostById implements Response {
    statusCode: Int!,
    message: String,
    error: String,
    data: Post
  }
  type followDetails {
    _id:ID!
    username:String
  }
  type ResponseGetUserById implements Response {
    statusCode: Int!,
    message: String,
    error: String,
    data: User
    followers:[followDetails]
    following:[followDetails]
  }
`;

module.exports = {
  responseTypeDefs: typeDefs,
};
