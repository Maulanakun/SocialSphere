// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { LoginProvider } from "./src/context/LoginContext";
import StackHolder from "./src/stack/StackHolder";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <StackHolder />
      </LoginProvider>
    </ApolloProvider>
  );
};

export default App;
