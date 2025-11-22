import AddModal from "@/src/components/add-modal/add-modal";
import GalleryList from "@/src/components/gallery-list/gallery-list";
import Spinner from "@/src/components/spinner/spinner";
import Toolbar from "@/src/components/toolbar/toolbar";
import { ImageItem } from "@/src/types/image-item";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as fileService from "../../services/file-service";
import * as imageService from "../../services/image-service";
import { headings } from "../../styles";

const Gallery: React.FC = () => {
  // All images within the application directory
  const [images, setImages] = useState<ImageItem[]>([]);
  // All selected images
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  // A boolean flag to indicate whether the images are being loaded or not
  const [loadingImages, setLoadingImages] = useState<boolean>(true);
  // A boolean flag to indicate whether the modal to add an image is open or not
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const images = await fileService.getAllImages();
      setImages(images);
      setLoadingImages(false);
    })();
  }, []);

  // Helper functions
  const onImageLongPress = (name: string): void => {
    if (selectedImages.indexOf(name) !== -1) {
      // The image is already within the list
      setSelectedImages(selectedImages.filter((image) => image !== name));
    } else {
      // Add the new image
      setSelectedImages([...selectedImages, name]);
    }
  };

  const deleteSelectedImages = async (): Promise<void> => {
    setLoadingImages(true);

    // Promise.all resolves the list of promises resulting in all images being deleted.
    await Promise.all(
      selectedImages.map((image) =>
        fileService.remove(image)
      ) /* Returns a list of promises */
    );

    // Correct the state variables
    setSelectedImages([]);
    setImages(
      images.filter((image) => selectedImages.indexOf(image.name) === -1)
    );
    setLoadingImages(false);
  };

  const takePhoto = async (): Promise<void> => {
    const photo = await imageService.takePhoto();
    if (photo.length > 0) {
      await addImage(photo);
    }
  };

  const selectFromCameraRoll = async (): Promise<void> => {
    const photo = await imageService.selectFromCameraRoll();
    if (photo.length > 0) {
      await addImage(photo);
    }
  };

  const addImage = async (image: string): Promise<void> => {
    setLoadingImages(true);

    const newImage = await fileService.addImage(image);

    setImages([...images, newImage as unknown as ImageItem]);
    setIsAddModalOpen(false);
    setLoadingImages(false);
  };

  const displayCaption = (): React.ReactNode => {
    if (selectedImages.length === 0) {
      return null;
    }

    let itemCaption = "images";
    if (selectedImages.length === 1) {
      itemCaption = "image";
    }

    return (
      <Text
        style={[
          headings.h3,
          { marginLeft: 20, marginTop: 10, marginBottom: 5 },
        ]}
      >
        {selectedImages.length} {itemCaption} selected
      </Text>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Toolbar
        hasSelectedImages={selectedImages.length > 0}
        onAdd={() => setIsAddModalOpen(true)}
        onRemove={() => deleteSelectedImages()}
      />
      {loadingImages ? (
        <Spinner />
      ) : (
        <>
          {displayCaption()}
          <GalleryList
            images={images}
            selectedImages={selectedImages}
            onLongPress={(name: string) => onImageLongPress(name)}
          />
        </>
      )}
      <AddModal
        isOpen={isAddModalOpen}
        closeModal={() => setIsAddModalOpen(false)}
        takePhoto={() => takePhoto()}
        selectFromCameraRoll={() => selectFromCameraRoll()}
      />
    </View>
  );
};

export default Gallery;
