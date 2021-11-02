import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import LikeImage from '../../resources/like-float.png';

const LikeAnimation = () => {
    // The initial position of the like floating icon
    const [position] = useState(new Animated.Value(0));
    // The initial opacity of the like floating icon
    const [opacity] = useState(new Animated.Value(0));
    // The initial scale of the like floating icon
    const [scale] = useState(new Animated.Value(1));

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(position, {
                    toValue: -100,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                })
            ]),
            Animated.timing(scale, {
                toValue: 3,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(scale, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    const animationStyle = {
        transform: [
            { translateY: position },
            { scale }
        ],
        opacity
    };

    return <Animated.Image style={[styles.image, animationStyle]} source={LikeImage} />;
}

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        width: 100,
        height: 100
    }
});

export default LikeAnimation;
