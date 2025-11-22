import DraggableImage from "@/src/components/draggable-image/draggable-image";
import images from "@/src/static";
import React from "react";
import { StyleSheet, View } from "react-native";

const App = () => (
  <View style={styles.container}>
    {images.map(({ name, src }) => (
      <DraggableImage key={name} src={src} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "lightskyblue",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
