import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";
import fetchIp from "../fecthIp.json";
import { MaterialIcons } from "@expo/vector-icons";

export default function WelcomeScreen({ navigation }) {
  const username = useSelector((state) => state.user.value.username);
  const email = useSelector((state) => state.user.value.email);
  const users = useSelector((state) => state.user.value);
  const [numberTask, setNumberTask] = useState();
  const [numberFavorites, setNumberFavorites] = useState();

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/todo/numberTodo/${users.token}`)
      .then((res) => res.json())
      .then((data) => {
        setNumberTask(data.data);
      });
  }, [users.todo]);

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/todo/numberFavorites/${users.token}`)
      .then((res) => res.json())
      .then((data) => {
        setNumberFavorites(data.data);
      });
  }, [users.favorites]);

  return (
    <View style={styles.container}>
      <Header username={username} email={email} navigation={navigation} />
      <View
        style={{
          height: "85%",
          width: "100%",
          padding: 10,
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Majournee")}
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 200,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="sunny-outline" size={24} color="#fff" />
            <Text style={{ color: "#fff", marginLeft: 10 }}>Ma journée</Text>
          </View>

          <Text style={{ color: "#fff" }}>{numberTask}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View
            style={{ width: 200, flexDirection: "row", alignItems: "center" }}
          >
            <MaterialIcons
              name="notification-important"
              size={24}
              color="#fff"
            />
            <Text style={{ color: "#fff", marginLeft: 10 }}>Important</Text>
          </View>

          <Text style={{ color: "#fff" }}>{numberFavorites}</Text>
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
