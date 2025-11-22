import React, { ReactNode } from "react";
import {
  Pressable,
  Modal as RNModal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  title,
  children,
}) => (
  <RNModal
    visible={isOpen}
    transparent={true}
    animationType="slide"
    onRequestClose={closeModal}
    statusBarTranslucent
  >
    <Pressable style={styles.backdrop} onPress={closeModal}>
      <Pressable
        style={styles.modalContainer}
        onPress={(e) => e.stopPropagation()}
      >
        <View style={styles.modalContent}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <View style={styles.childrenContainer}>{children}</View>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  </RNModal>
);

export default Modal;
