import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

export default function WelcomeScreen() {
  const username = useSelector((state) => state.user.value.username);
  const email = useSelector((state) => state.user.value.email);
  return (
    <View style={styles.container}>
      <Header username={username} email={email} />
      <View style={{ height: "85%", width: "100%" }}></View>
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
