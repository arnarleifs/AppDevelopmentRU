import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import LikeImage from '../../resources/like.png';
import LikedImage from '../../resources/liked.png';
import LikeAnimation from '../LikeAnimation';

const LikeButton = () => {
    const [hasLike, setHasLike] = useState(false);
    const [animation, setAnimation] = useState(false);

    const onButtonPress = () => {
        setHasLike(!hasLike);
        setAnimation(!hasLike);
    };

    // Determines what the active image is, at the given time.
    const activeImage = hasLike ? LikedImage : LikeImage;

    return (
        <View>
            <TouchableOpacity
                activeOpacity={.7}
                onPress={() => onButtonPress()}>
                <Image style={styles.button} source={activeImage} />
            </TouchableOpacity>
            {
                animation
                    ?
                    <LikeAnimation />
                    :
                    <></>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 100
    }
});

export default LikeButton;