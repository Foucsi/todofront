import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Button,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { logout, addPhoto } from "../reducers/user";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import fetchIp from "../fecthIp.json";
import { useEffect } from "react";

export default function Header({ username, email, navigation }) {
  const users = useSelector((state) => state.user.value);
  const [image, setImage] = useState(users.photo);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/users/photo/${users.token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setImage(data.data);
        }
      });
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      fetch(`http://${fetchIp.myIp}:3000/users/addPhoto/${users.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photo: result.assets[0].uri }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.result);
        });
      setImage(result.assets[0].uri);
      dispatch(addPhoto(result.assets[0].uri));
    }
  };

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
                height: 250,
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
                paddingTop: 20,
              }}
            >
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                />
              )}

              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button title="Upload" onPress={pickImage} />
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
                style={{ paddingBottom: 30 }}
                onPress={() => {
                  dispatch(logout());
                  navigation.navigate("Home");
                }}
              >
                <Text
                  style={{ fontSize: 22, color: "#5465FF", paddingBottom: 20 }}
                >
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
            <Image
              source={{ uri: image }}
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
          </View>
          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: "bold",
              paddingLeft: 20,
            }}
          >
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
