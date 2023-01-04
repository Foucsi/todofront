import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import fetchIp from "../fecthIp.json";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

export default function ImportantScreen({ navigation }) {
  const [listingFavorites, setListingFavorites] = useState([]);
  const users = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/todo/allFavorites/${users.token}`)
      .then((res) => res.json())
      .then((data) => {
        setListingFavorites(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users.token]);

  const listing = listingFavorites.map((e, index) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: "#fff",
          width: "95%",
          height: 60,
          marginTop: 10,
          borderRadius: 5,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          padding: 5,
        }}
      >
        <Text style={{ color: "#000" }}>{e.favorites}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Welcome")}
        style={{
          paddingTop: 70,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        <AntDesign name="left" size={22} color="#fff" />
        <Text style={{ color: "#fff", fontSize: 24, paddingLeft: 20 }}>
          Listes
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: "50%",
          width: "100%",
          alignItems: "center",
        }}
      >
        {listing}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "salmon",
  },
});
