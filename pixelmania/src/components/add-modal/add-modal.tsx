import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "../modal/modal";
import styles from "./styles";

interface AddModalProps {
  isOpen: boolean;
  closeModal: () => void;
  takePhoto: () => void;
  selectFromCameraRoll: () => void;
}

const AddModal: React.FC<AddModalProps> = ({
  isOpen,
  closeModal,
  takePhoto,
  selectFromCameraRoll,
}) => (
  <Modal title="Add Image" isOpen={isOpen} closeModal={closeModal}>
    <View style={styles.optionsContainer}>
      <TouchableOpacity
        onPress={() => {
          takePhoto();
          closeModal();
        }}
        style={styles.option}
      >
        <Entypo name="camera" size={48} color="#007AFF" style={styles.icon} />
        <Text style={styles.optionText}>Take Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          selectFromCameraRoll();
          closeModal();
        }}
        style={styles.option}
      >
        <Entypo name="image" size={48} color="#007AFF" style={styles.icon} />
        <Text style={styles.optionText}>Choose from Library</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

export default AddModal;
