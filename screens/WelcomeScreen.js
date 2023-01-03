import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";
import fetchIp from "../fecthIp.json";

export default function WelcomeScreen({ navigation }) {
  const username = useSelector((state) => state.user.value.username);
  const email = useSelector((state) => state.user.value.email);
  const users = useSelector((state) => state.user.value);
  const [numberTask, setNumberTask] = useState();

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/todo/numberTodo/${users.token}`)
      .then((res) => res.json())
      .then((data) => {
        setNumberTask(data.data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Header username={username} email={email} />
      <View
        style={{
          height: "85%",
          width: "100%",
          padding: 10,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Majournee")}
          style={{ width: "100%", flexDirection: "row" }}
        >
          <Ionicons name="sunny-outline" size={24} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 10 }}>Ma journée</Text>
        </TouchableOpacity>
        <Text style={{ color: "#fff" }}>{numberTask}</Text>
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
