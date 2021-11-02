import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Toolbar from '../../components/Toolbar';
import GalleryList from '../../components/GalleryList';
import AddModal from '../../components/AddModal';
import Spinner from '../../components/Spinner';
import * as fileService from '../../services/fileService';
import * as imageService from '../../services/imageService';
import { headings } from '../../styles';

const Gallery = () => {
    // All images within the application directory
    const [images, setImages] = useState([]);
    // All selected images
    const [selectedImages, setSelectedImages] = useState([]);
    // A boolean flag to indicate whether the images are being loaded or not
    const [loadingImages, setLoadingImages] = useState(true);
    // A boolean flag to indicate whether the modal to add an image is open or not
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const images = await fileService.getAllImages();
            setImages(images);
            setLoadingImages(false);
        })();
    }, []);

    // Helper functions
    const onImageLongPress = name => {
        if (selectedImages.indexOf(name) !== -1) {
            // The image is already within the list
            setSelectedImages(selectedImages.filter(image => image !== name));
        } else {
            // Add the new image
            setSelectedImages([...selectedImages, name]);
        }
    };

    const deleteSelectedImages = async () => {
        setLoadingImages(true);

        // Promise.all resolves the list of promises resulting in all images being deleted.
        await Promise.all(selectedImages.map(image => fileService.remove(image)) /* Returns a list of promises */);

        // Correct the state variables
        setSelectedImages([]);
        setImages(images.filter(image => selectedImages.indexOf(image.name) === -1));
        setLoadingImages(false);
    }

    const takePhoto = async () => {
        const photo = await imageService.takePhoto();
        if (photo.length > 0) { await addImage(photo); }
    }

    const selectFromCameraRoll = async () => {
        const photo = await imageService.selectFromCameraRoll();
        if (photo.length > 0) { await addImage(photo); }
    }

    const addImage = async image => {
        setLoadingImages(true);

        const newImage = await fileService.addImage(image);

        setImages([...images, newImage]);
        setIsAddModalOpen(false);
        setLoadingImages(false);
    };

    const displayCaption = () => {
        if (selectedImages.length === 0) { return; }

        let itemCaption = 'images';
        if (selectedImages.length === 1) {
            itemCaption = 'image';
        }

        return <Text style={[headings.h3, { marginLeft: 20, marginTop: 10, marginBottom: 5 }]}>{selectedImages.length} {itemCaption} selected</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Toolbar
                hasSelectedImages={selectedImages.length > 0}
                onAdd={() => setIsAddModalOpen(true)}
                onRemove={() => deleteSelectedImages()} />
            {
                loadingImages
                    ?
                    <Spinner />
                    :
                    <>
                        {displayCaption()}
                        <GalleryList
                            images={images}
                            selectedImages={selectedImages}
                            onLongPress={name => onImageLongPress(name)} />
                    </>
            }
            <AddModal
                isOpen={isAddModalOpen}
                closeModal={() => isAddModalOpen(false)}
                takePhoto={() => takePhoto()}
                selectFromCameraRoll={() => selectFromCameraRoll()} />
        </View>
    )
}

Gallery.navigationOptions = _ => ({
    title: 'Gallery'
});

export default Gallery;