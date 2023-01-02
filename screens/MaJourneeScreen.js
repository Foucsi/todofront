import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function MaJourneeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          height: "100%",
          width: "100%",
        }}
        source={require("../assets/pex.jpg")}
        resizeMode="cover"
      >
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
