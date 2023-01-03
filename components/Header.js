import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { logout } from "../reducers/user";
import { useDispatch } from "react-redux";

export default function Header({ username, email, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setModalVisible(true)}
    >
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <View
            style={{
              width: "100%",
              height: "5%",
              alignItems: "flex-end",
              borderBottomWidth: 1,
              borderBottomColor: "grey",
            }}
          >
            <View
              style={{
                width: "63%",
                height: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: 15,
              }}
            >
              <Text style={{ fontSize: 22, color: "#fff" }}>Paramétres</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ fontSize: 22, color: "#5465FF" }}>OK</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 200,
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  height: 100,
                  width: 100,
                  backgroundColor: "grey",
                  borderRadius: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 32, color: "#fff", fontWeight: "bold" }}
                >
                  {username[0]}
                </Text>
              </View>
              <Text style={{ color: "#fff", fontSize: 24 }}>{username}</Text>
              <Text style={{ color: "#fff", fontSize: 20 }}>{email}</Text>
            </View>
            <View
              style={{
                height: 600,
                width: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  dispatch(logout());
                  navigation.navigate("Home");
                }}
              >
                <Text style={{ fontSize: 22, color: "#5465FF" }}>
                  Se deconnecter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "30%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View style={styles.user}>
            <Text style={{ fontSize: 24, color: "#fff" }}>{username[0]}</Text>
          </View>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
            {username}
          </Text>
        </View>

        <View
          style={{
            width: "70%",
            alignItems: "flex-end",
          }}
        >
          <Feather name="search" size={24} color="#fff" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: "15%",
    paddingBottom: 20,
    width: "100%",
    backgroundColor: "#130303",
    flexDirection: "row",
    padding: 10,
  },
  user: {
    backgroundColor: "#7D7C7A",
    height: 40,
    width: 40,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: "15%",
    height: "95%",
    backgroundColor: "#1B2021",
  },
});
