// SplashScreen.js
import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("InitialLaunchScreen");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require("../assets/images/icon.png")}
        />
      </View>
      <View style={styles.logoContainer}>
        <Text style={styles.from}>from</Text>
        <View style={styles.logoTextWrapper}>
          <Image
            style={styles.logo}
            source={require("../assets/images/facebookTextLogo.png")}
          />
        </View>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  iconContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
  logoTextWrapper: {
    width: "40%",
    height: 20,
  },
  icon: {
    width: 200,
    height: 100,
  },
  logo: {
    flex: 1,
    width: undefined,
  },
  from: {
    color: "gray",
    marginBottom: 15,
  },
});
export default SplashScreen;
