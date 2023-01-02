import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#F6F7F8", fontSize: 32 }}>Welcome ToDo</Text>
      <View style={styles.containerTouchable}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={{ color: "#F6F7F8" }}>Connection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={{ color: "#F6F7F8" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#04092D",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTouchable: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  touchable: {
    borderColor: "#F6F7F8",
    borderWidth: 1,
    width: "50%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});
