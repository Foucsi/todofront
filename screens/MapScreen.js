import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";

export default function MapScreen() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [city, setCity] = useState();

  const addMarker = (
    <Marker
      coordinate={{ latitude: latitude, longitude: longitude }}
      title={"title"}
      pinColor="purple"
    />
  );
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType="hybrid"
        onLongPress={(e) => {
          setLongitude(e.nativeEvent.coordinate.longitude);
          setLatitude(e.nativeEvent.coordinate.latitude);
          console.log(e.nativeEvent);
        }}
      >
        {addMarker}
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
