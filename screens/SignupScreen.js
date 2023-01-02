import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import fecthIp from "../fecthIp.json";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const handleRegister = () => {
    fetch(`http://${fecthIp.myIp}:3000/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: data.user.username,
              email: data.user.email,
              token: data.user.token,
            })
          );
          navigation.navigate("Welcome");
          setUsername("");
          setEmail("");
          setPassword("");
          setMsg("");
        } else if (data.error === "Missing or empty fields") {
          setMsg("Missing or empty fields");
        } else if (data.error === "User already exists") {
          setMsg(
            <View>
              <Text style={{ color: "#fff" }}>User already exists</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                <Text
                  style={{
                    color: "#fff",
                    textDecorationLine: "underline",
                    textDecorationStyle: "solid",
                    textDecorationColor: "#fff",
                  }}
                >
                  connection
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "#F6F7F8", fontSize: 22 }}>
        Welcome, Create a new account !
      </Text>
      <View style={{ width: 180 }}>
        <Text style={{ color: "#fff" }}>
          Already have an account ?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
            <Text
              style={{
                color: "#fff",
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                textDecorationColor: "#fff",
              }}
            >
              connection
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
          placeholder="Email"
          placeholderTextColor="#7D7C7A"
          style={styles.input}
          autoCapitalize={false}
          value={email}
          onChangeText={(value) => setEmail(value)}
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
        <Text style={{ color: "#F6F7F8", fontSize: 20 }}>Register</Text>
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
