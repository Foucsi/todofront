import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";
import fetchIp from "../fecthIp.json";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addTodo, removeTodo, addFavorites } from "../reducers/user";

export default function MaJourneeScreen({ navigation }) {
  const [listTask, setListTask] = useState([]);
  const [colorStar, setColorStar] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.value);
  const joursSemaine = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const mois = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const aujourdhui = new Date();
  const jour = aujourdhui.getDay();
  const jourNum = aujourdhui.getDate();
  const moisNum = aujourdhui.getMonth();

  useEffect(() => {
    fetch(`http://${fetchIp.myIp}:3000/users/${users.token}`)
      .then((res) => res.json())
      .then((data) => {
        setListTask(data.user.todo);
      });
  }, [input]); // [input] indique que l'effet doit être exécuté chaque fois que la valeur de input change

  const handleFavorites = (task) => {
    fetch(`http://${fetchIp.myIp}:3000/favorites/addFavorites/${users.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorites: task }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setColorStar(!colorStar);
          console.log(task);
          dispatch(addFavorites({ favorites: input }));
        }
      });
  };

  const listing = listTask.map((e, index) => {
    return (
      <View key={index} style={styles.task}>
        <Text>{e.todo}</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => handleFavorites(e.todo)}>
            <AntDesign
              name="staro"
              size={24}
              color={colorStar ? "tomato" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemove(e)}>
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  const handleClick = () => {
    if (input) {
      fetch(`http://${fetchIp.myIp}:3000/todo/addTodo/${users.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: input }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            // setListTask([{ todo: input }, ...listTask]);
            setListTask([...listTask, { todo: input }]);
            //onfait une copie du tableau listTask pour pouvoir ensuite le modifier
            setInput("");
            dispatch(addTodo({ todo: input }));
          }
        });
    }
  };

  const handleRemove = (e) => {
    fetch(`http://${fetchIp.myIp}:3000/todo/removeTodo/${users.token}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: e.todo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setListTask(listTask.filter((task) => task !== e));
          dispatch(removeTodo(e.todo));
        }
      });
  };

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
        <View style={{ paddingLeft: 15, paddingTop: 15, paddingBottom: 15 }}>
          <Text style={{ color: "#fff", fontSize: 32, fontWeight: "bold" }}>
            Ma journée
          </Text>
          <Text
            style={{ color: "#fff", fontSize: 20 }}
          >{`${joursSemaine[jour]} ${jourNum} ${mois[moisNum]}`}</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "60%",
            padding: 15,
          }}
        >
          <ScrollView>{listing}</ScrollView>
        </View>
        <View
          style={{
            height: "15%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                padding: 15,
                borderBottomColor: "#fff",
                borderBottomWidth: 1,
                fontSize: 24,
                color: "#fff",
                width: "80%",
              }}
              placeholder="Ajouter une tache"
              placeholderTextColor="grey"
              value={input}
              onChangeText={(value) => setInput(value)}
            />
            <TouchableOpacity onPress={() => handleClick()}>
              <MaterialIcons name="add-task" size={42} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
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
  task: {
    marginTop: 5,
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 8,
    opacity: 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
});
