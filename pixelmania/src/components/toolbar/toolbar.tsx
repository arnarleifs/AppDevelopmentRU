import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import styles from "./styles";

interface ToolbarProps {
  hasSelectedImages: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  hasSelectedImages,
  onAdd,
  onRemove,
}) => (
  <View style={styles.toolbar}>
    <TouchableHighlight style={styles.toolbarAction} onPress={onAdd}>
      <Text style={styles.toolbarActionText}>Add image</Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={styles.toolbarAction}
      onPress={onRemove}
      disabled={!hasSelectedImages}
    >
      <Text
        style={[
          styles.toolbarActionText,
          !hasSelectedImages && { color: "rgba(155, 155, 155, .5)" },
        ]}
      >
        Delete
      </Text>
    </TouchableHighlight>
  </View>
);

export default Toolbar;
