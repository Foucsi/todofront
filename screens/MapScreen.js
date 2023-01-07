import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";

export default function MapScreen() {
  const [arrayList, setArrayList] = useState([]);
  const colors = [
    "green",
    "red",
    "purple",
    "yellow",
    "tomato",
    "black",
    "orange",
    "white",
  ];
  const randomColors = colors[Math.floor(Math.random() * colors.length)];

  const allList = arrayList.map((elmt) => {
    console.log(elmt);
    return elmt;
  });

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
        style={styles.map}
        mapType="hybrid"
        onLongPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;

          setArrayList([
            ...arrayList,
            <Marker
              pinColor={randomColors}
              coordinate={{
                longitude: longitude,
                latitude: latitude,
              }}
            />,
          ]);
        }}
      >
        {allList}
      </MapView>
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
  map: {
    height: "100%",
    width: "100%",
  },
});
