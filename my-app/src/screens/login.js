// LoginScreen.js
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../config/colors";
import { useLazyQuery } from "@apollo/client";
import { UserLogin } from "../../queries";
import * as secureStore from "expo-secure-store";
import { LoginContext } from "../context/LoginContext";

const LoginScreen = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [dispatcher, { data }] = useLazyQuery(UserLogin, {
    onCompleted: async (res) => {
      let token = null;
      console.log(res.userLogin.token);
      if (res && res.userLogin && res.userLogin.token) {
        token = res.userLogin.token;
      }
      await secureStore.setItemAsync("token", token);
      setIsLoggedIn(true);
    },
    onError: async (err) => {
      console.log(err);
    },
    fetchPolicy: "network-only",
  });

  const onPressToRegist = () => {
    navigation.navigate("RegistForm");
  };
  const handleLogin = async () => {
    // Handle login logic here
    console.log(
      "Login pressed with username:",
      username,
      "and password:",
      password
    );
    await dispatcher({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/instagramLogo.png")}
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={onPressToRegist}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: colors.gray1,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    width: "100%",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray,
  },
  orText: {
    marginHorizontal: 10,
    color: colors.gray,
  },
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: "center",
    marginBottom: 10,
  },
  facebookButtonText: {
    color: colors.primary,
    marginLeft: 10,
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: colors.gray,
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  signupText: {
    color: colors.gray,
  },
  signupLink: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
