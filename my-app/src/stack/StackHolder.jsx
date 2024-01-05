import { View, Text } from "react-native";
import React from "react";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/splashScreen";
import InitialLaunchScreen from "../screens/InitialLaunchScreen";
import HomeScreen from "../screens/home";
import Login from "../screens/login";
import Regist from "../screens/Regist";

import { LoginContext } from "../context/LoginContext";
import TabNavigator from "../screens/TabNavigator";

const Stack = createNativeStackNavigator();
const StackHolder = () => {
  const { isLoggedIn } = useContext(LoginContext);
  console.log(isLoggedIn);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <>
          <TabNavigator />
        </>
      ) : (
        <Stack.Navigator>
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen
              name="InitialLaunchScreen"
              component={InitialLaunchScreen}
            />
            <Stack.Screen name="entry" component={Login}></Stack.Screen>
            <Stack.Screen name="RegistForm" component={Regist}></Stack.Screen>
          </>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackHolder;
