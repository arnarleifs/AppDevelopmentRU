import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const Main: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.paragraph}>
        The most powerful image manipulation application out there! Feel free to
        test out its powers!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/gallery")}
        accessibilityLabel="Go to Gallery"
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
