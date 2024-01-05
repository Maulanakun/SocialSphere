import { ApolloClient, InMemoryCache } from "@apollo/client";

// ?? Apollo Link
import { createHttpLink } from "@apollo/client";
// ?? Apollo AuthLink
import { setContext } from "@apollo/client/link/context";
// ?? We will read token from SecureStore
import * as SecureStore from "expo-secure-store";

// ?? Create HTTPLink
const httpLink = createHttpLink({
  uri: "https://zn5prszr-3000.asse.devtunnels.ms/",
});

// ?? Create AuthLink
const authLink = setContext(async (_, { headers }) => {
  // ?? Get the token from the SecureStore
  const token = await SecureStore.getItemAsync("token");

  // ?? Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // ?? Inject the token
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Apollo Server Location
  // uri: "http://localhost:4000",
  // ?? Change standard uri to httpLink
  link: authLink.concat(httpLink),
  // Auto caching from Apollo
  cache: new InMemoryCache(),
});

// export it
export default client;
