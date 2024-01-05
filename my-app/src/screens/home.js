import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const data = [
  { id: "1", image: "https://via.placeholder.com/150" },
  { id: "2", image: "https://via.placeholder.com/150" },
  // Tambahkan lebih banyak data jika diperlukan
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Instagram</Text>
        <Ionicons name="md-add-circle-outline" size={32} color="black" />
      </View>

      {/* Body - FlatList */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <TouchableOpacity>
              <Image source={{ uri: item.image }} style={styles.postImage} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bottom Tab */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  postContainer: {
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 300,
  },
});

export default HomeScreen;
