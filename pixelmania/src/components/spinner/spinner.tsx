import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";

const Spinner = () => (
  <View style={styles.spinner}>
    <ActivityIndicator color="black" />
  </View>
);

export default Spinner;
