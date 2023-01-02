import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function WelcomeScreen({ navigation }) {
  const username = useSelector((state) => state.user.value.username);
  const email = useSelector((state) => state.user.value.email);

  return (
    <View style={styles.container}>
      <Header username={username} email={email} />
      <View style={{ height: "85%", width: "100%", padding: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Majournee")}
          style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="sunny-outline" size={24} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 10 }}>Ma journée</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#130303",
  },
});
