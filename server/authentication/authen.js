const { graphql, GraphQLError } = require("graphql");
const { decode } = require("../helpers/jwt");
const User = require("../models/user");

const authentication = async (req) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new GraphQLError("You are not authenticated", {
      extensions: {
        http: "401",
        code: "UNAUTHENTICATED",
      },
    });
  }

  const token = authorization.split(" ")[1];
  const payload = decode(token);

  const user = await User.findOne({ username: payload.username });
  if (!user) {
    throw new GraphQLError("You are not authenticated", {
      extensions: {
        http: "401",
        code: "UNAUTHENTICATED",
      },
    });
  }
  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
};

module.exports = authentication;
