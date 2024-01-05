// RegisterScreen.js

import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { UserRegist } from "../../queries";

const Regist = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dispatcher, { data }] = useMutation(UserRegist, {
    onCompleted: async (res) => {
      navigation.navigate("entry");
    },
    onError: async (error) => {
      console.log(error);
    },
  });

  const handleRegister = async () => {
    // Implement logic for registration here
    console.log("Registration details:", { username, name, email, password });
    // You can add API calls or other registration logic
    await dispatcher({
      variables: {
        input: {
          username: username,
          name: name,
          email: email,
          password: password,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/instagramLogo.png")}
      />
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
});

export default Regist;
