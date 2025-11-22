import Spinner from "@/src/components/spinner/spinner";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";
import { loadImage } from "../../services/file-service";
import styles from "./styles";

const Preview: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>("");
  const [loadingImage, setLoadingImage] = useState<boolean>(true);

  const { fileName } = useLocalSearchParams<{ fileName: string }>();

  useEffect(() => {
    (async () => {
      if (fileName) {
        const currentImage = await loadImage(fileName);
        setCurrentImage(currentImage);
        setLoadingImage(false);
      }
    })();
  }, [fileName]);

  return loadingImage ? (
    <Spinner />
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ImageBackground
        resizeMode="contain"
        source={{
          uri: `data:image/jpeg;base64

,${currentImage}`,
        }}
        style={styles.background}
      />
    </View>
  );
};

export default Preview;
