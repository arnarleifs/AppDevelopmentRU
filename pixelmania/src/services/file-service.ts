import { Directory, File, Paths } from "expo-file-system";

// Create the image directory
const imageDirectory = new Directory(Paths.document, "images");

// Define types
export interface ImageItem {
  name: string;
  type: "image";
  file: string;
}

type ErrorHandler = (error: Error) => void;

// Generic error handler with proper typing
const onException = async <T>(
  cb: () => T | Promise<T>,
  errorHandler?: ErrorHandler
): Promise<T | null> => {
  try {
    return await cb();
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));


    
    if (errorHandler) {
      errorHandler(error);
    } else {
      console.error("[FileService Error]:", error.message);
    }
    
    return null;
  }
};

/**
 * Cleans the entire image directory
 */
export const cleanDirectory = async (): Promise<void> => {
  await onException(() => {
    if (imageDirectory.exists) {
      imageDirectory.delete();
    }
  });
};

/**
 * Copies a file from one location to another
 */
export const copyFile = async (
  sourceUri: string,
  destinationUri: string
): Promise<void> => {
  const result = await onException(() => {
    const sourceFile = new File(sourceUri);
    const destinationFile = new File(destinationUri);
    sourceFile.copy(destinationFile);
  });

  if (result === null) {
    throw new Error(`Failed to copy file from ${sourceUri} to ${destinationUri}`);
  }
};

/**
 * Adds an image to the directory
 */
export const addImage = async (imageLocation: string): Promise<ImageItem> => {
  // Ensure directory exists
  await setupDirectory();

  const folderSplit = imageLocation.split("/");
  const fileName = folderSplit[folderSplit.length - 1];

  const sourceFile = new File(imageLocation);
  const destinationFile = new File(imageDirectory.uri, fileName);

  await onException(() => {
    sourceFile.copy(destinationFile);
  });

  const fileContent = await loadImage(fileName);

  return {
    name: fileName,
    type: "image",
    file: fileContent,
  };
};

/**
 * Removes an image from the directory
 */
export const remove = async (name: string): Promise<void> => {
  await onException(() => {
    const file = new File(imageDirectory.uri, name);
    if (file.exists) {
      file.delete();
    }
  });
};

/**
 * Loads an image as a base64 string
 */
export const loadImage = async (fileName: string): Promise<string> => {
  const result = await onException(() => {
    const file = new File(imageDirectory.uri, fileName);
    return file.base64();
  });

  if (result === null) {
    console.warn(`Failed to load image: ${fileName}`);


    return "";
  }

  return result;
};

/**
 * Sets up the image directory if it doesn't exist
 */
const setupDirectory = async (): Promise<void> => {
  await onException(() => {
    if (!imageDirectory.exists) {
      imageDirectory.create();
      console.log("Image directory created:", imageDirectory.uri);
    }
  });
};

/**
 * Gets all images from the directory
 */
export const getAllImages = async (): Promise<ImageItem[]> => {
  // Check if directory exists
  await setupDirectory();

  const items = await onException(() => {
    return imageDirectory.list();
  });

  if (!items || items.length === 0) {
    return [];
  }

  // Filter to only get File instances (not directories) and extract names
  const imageFiles = items
    .filter((item) => item instanceof File)
    .map((item) => (item as File).name)
    .filter(
      (fileName) =>
        !fileName.startsWith(".") &&
        /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(fileName)
    );

  const images = await Promise.all(
    imageFiles.map(async (fileName): Promise<ImageItem> => {
      const fileContent = await loadImage(fileName);
      return {
        name: fileName,
        type: "image",
        file: fileContent,
      };
    })
  );

  return images;
};
