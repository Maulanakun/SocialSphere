import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { Component } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../config/colors";
import PrimaryButton from "../components/PrimaryButton";

const InitialLaunchScreen = ({ navigation }) => {
  const handleToLogin = () => {
    navigation.navigate("RegistForm");
  };
  const handleToRegist = () => {
    navigation.navigate("entry");
  };
  return (
    <View style={styles.container}>
      <View style={styles.languageWrapper}>
        <TouchableOpacity>
          <Text style={styles.from}>English(usited States)</Text>
          <FontAwesome name="caret-down" size={25} color={colors.gray1} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <Image
          style={styles.instaLogo}
          source={require("../assets/images/instagramLogo.png")}
        />
        <PrimaryButton
          buttonLabel="Create New Account"
          buttonBgColor={colors.primary}
          textColor={colors.secondary}
          onPress={handleToLogin}
        />
        <PrimaryButton
          buttonLabel="Login"
          buttonBgColor={colors.secondary}
          textColor={colors.primary}
          onPress={handleToRegist}
        />
      </View>
      <View style={styles.footerWrapper}>
        <View style={styles.footerContentWrapper}>
          <Text style={styles.from}>From</Text>
          <Text style={styles.Book}>BOOK</Text>
        </View>
      </View>
    </View>
  );
};

export default InitialLaunchScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  languageWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footerWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  instaLogo: {
    width: "50%",
    height: "25%",
  },
  footerContentWrapper: {
    borderTopColor: colors.gray1,
    borderTopWidth: 1,
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  from: {
    color: colors.gray,
  },
  Book: {
    fontWeight: "bold",
  },
});
