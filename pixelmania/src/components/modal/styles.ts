import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    minHeight: 200,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  childrenContainer: {
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 15,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "600",
  },
});
