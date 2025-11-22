import * as ImagePicker from "expo-image-picker";

const CAMERA_ROLL = "CAMERA_ROLL";
const CAMERA = "CAMERA";

type PermissionType = typeof CAMERA | typeof CAMERA_ROLL;

/**
 * Request permissions for camera and/or media library
 */
const getPermission = async (
  permissionTypes: PermissionType[]
): Promise<void> => {
  if (permissionTypes.includes(CAMERA)) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Camera permission not granted");
    }
  }

  if (permissionTypes.includes(CAMERA_ROLL)) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Media library permission not granted");
    }
  }
};

/**
 * Select an image from the camera roll/media library
 */
export const selectFromCameraRoll = async (): Promise<string> => {
  try {
    await getPermission([CAMERA_ROLL]);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: true,
      aspect: [16, 9] as [number, number],
      allowsEditing: true,
    });

    if (result.canceled) {
      return "";
    }

    return result.assets[0].uri;
  } catch (error) {
    console.error("Error selecting from camera roll:", error);
    return "";
  }
};

/**
 * Take a photo using the camera
 */
export const takePhoto = async (): Promise<string> => {
  try {
    await getPermission([CAMERA, CAMERA_ROLL]);

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      base64: true,
      aspect: [16, 9] as [number, number],
      allowsEditing: true,
    });

    if (result.canceled) {
      return "";
    }

    return result.assets[0].uri;
  } catch (error) {
    console.error("Error taking photo:", error);
    return "";
  }
};
