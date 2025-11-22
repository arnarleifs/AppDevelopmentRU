import { Counter } from "@/src/components/counter/counter";
import { Footer } from "@/src/components/footer/footer";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Counter />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
