import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface ImageThumbnailProps {
  file: string;
  name: string;
  onLongPress: (name: string) => void;
  isSelected: boolean;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({
  file,
  name,
  onLongPress,
  isSelected,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onLongPress={() => onLongPress(name)}
      onPress={() =>
        router.push({
          pathname: "/preview",
          params: { fileName: name },
        })
      }
    >
      {isSelected ? (
        <AntDesign name="check-circle" style={styles.checkmark} />
      ) : null}
      <View style={{ opacity: isSelected ? 0.5 : 1 }}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: `data:image/jpeg;base64,${file}` }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ImageThumbnail;
