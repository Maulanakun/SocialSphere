const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolver } = require("./schemas/user");
const mongoConnection = require("./config/db");
const { responseTypeDefs } = require("./schemas/response");
const authentication = require("./authentication/authen");
const { postTypeDefs, postResolvers } = require("./schemas/posts");
const { followTypeDefs, followResolvers } = require("./schemas/follow");
const { getUserById } = require("./helpers/getuserByid");
const PORT = process.env.PORT || 3000;
const server = new ApolloServer({
  typeDefs: [userTypeDefs, responseTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolver, postResolvers, followResolvers],
});

(async () => {
  try {
    await mongoConnection.connect();
    const { url } = await startStandaloneServer(server, {
      listen: {
        port: PORT,
      },
      context: async ({ req }) => {
        return {
          doAuthentication: async () => authentication(req),
          getUserById: async () => getUserById,
        };
      },
    });
    console.log(`server running on ${url}`);
  } catch (error) {
    console.log(error);
  }
})();
