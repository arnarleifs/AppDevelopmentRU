import { ImageItem } from "@/src/types/image-item";
import React from "react";
import { FlatList, View } from "react-native";
import ImageThumbnail from "../image-thumbnail/image-thumbnail";
import styles from "./styles";

interface GalleryListProps {
  images: ImageItem[];
  selectedImages: string[];
  onLongPress: (name: string) => void;
}

const GalleryList: React.FC<GalleryListProps> = ({
  images,
  selectedImages,
  onLongPress,
}) => (
  <View style={styles.listContainer}>
    <FlatList<ImageItem>
      numColumns={3}
      data={images}
      extraData={selectedImages}
      renderItem={({ item: { file, name } }) => {
        return (
          <ImageThumbnail
            isSelected={selectedImages.indexOf(name) !== -1}
            onLongPress={onLongPress}
            name={name}
            file={file}
          />
        );
      }}
      keyExtractor={(image) => image.name}
    />
  </View>
);

export default GalleryList;
