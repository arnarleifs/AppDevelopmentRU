import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import { loadImage } from '../../services/fileService';
import styles from './styles';
import Spinner from '../../components/Spinner';

const Preview = ({ route }) => {
    const [currentImage, setCurrentImage] = useState('');
    const [loadingImage, setLoadingImage] = useState(true);

    const { fileName } = route.params;

    useEffect(() => {
        (async () => {
            const currentImage = await loadImage(fileName);
            setCurrentImage(currentImage);
            setLoadingImage(false);
        })();
    }, []);

    return (
        loadingImage
            ?
            <Spinner />
            :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ImageBackground
                    resizeMode="contain"
                    source={{ uri: `data:image/jpeg;base64,${currentImage}` }}
                    style={styles.background} />
            </View>
    );
}

export default Preview;