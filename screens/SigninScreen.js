import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import fecthIp from "../fecthIp.json";

export default function SigninScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const handleRegister = () => {
    fetch(`http://${fecthIp.myIp}:3000/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: data.user.username,
              token: data.user.token,
              email: data.user.email,
              photo: data.user.photo,
            })
          );
          navigation.navigate("Welcome");
          setUsername("");
          setPassword("");
          setMsg("");
        } else if (data.error === "Missing or empty fields") {
          setMsg("Missing or empty fields");
        } else if (data.error === "User not found or wrong password") {
          setMsg(
            <View>
              <Text style={{ color: "#fff" }}>User already exists</Text>
              <TouchableOpacity
                onPress={() => {
                  setMsg("");
                  setPassword("");
                  setUsername("");
                  navigation.navigate("Signup");
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    textDecorationColor: "#fff",
                  }}
                >
                  register
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "#F6F7F8", fontSize: 22 }}>Welcome !</Text>
      <View style={{ width: 180 }}>
        <Text style={{ color: "#fff" }}>
          Do not have an account ?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                color: "#fff",
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                textDecorationColor: "#fff",
              }}
            >
              register
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#7D7C7A"
          style={styles.input}
          autoCapitalize={false}
          value={username}
          onChangeText={(value) => setUsername(value)}
        />

        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#7D7C7A"
          style={styles.input}
          autoCapitalize={false}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <View style={{ height: 50 }}>
        <Text style={{ color: "#fff" }}>{msg}</Text>
      </View>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => handleRegister()}
      >
        <Text style={{ color: "#F6F7F8", fontSize: 20 }}>Connection</Text>
      </TouchableOpacity>
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
  containerInput: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    width: "80%",
    borderBottomColor: "#F6F7F8",
    color: "#F6F7F8",
    borderBottomWidth: 0.2,
    padding: 10,
  },
  touchable: {
    borderColor: "#F6F7F8",
    borderWidth: 1,
    width: "50%",
    height: "5%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});
