import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../config/colors";

import React from "react";
import { useNavigation } from "@react-navigation/native";

const PrimaryButton = ({ buttonLabel, buttonBgColor, textColor, onPress }) => {
  const buttonText = buttonLabel;
  const buttonBg = buttonBgColor;
  const labelColor = textColor;
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { backgroundColor: buttonBg }]}
      >
        <Text style={[styles.text, { color: labelColor }]}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 6,
  },
  text: {
    textAlign: "center",
    color: colors.secondary,
    fontSize: 16,
  },
});
