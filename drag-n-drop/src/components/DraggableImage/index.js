import React, { useRef, useState } from 'react';
import { PanResponder, Animated, StyleSheet } from 'react-native';

const DraggableImage = ({ src }) => {
    const [dragging, setDragging] = useState(false);

    // Setup helper functions
    const setScale = (toValue, duration) => {
        Animated.timing(scale, {
            toValue,
            duration,
            useNativeDriver: true
        }).start();
    };

    const moveImage = (dx, dy) => {
        position.setValue({ x: dx, y: dy });
    };

    // Setup animation values
    const position = useRef(new Animated.ValueXY()).current;
    const scale = useRef(new Animated.Value(1)).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // Now I have the lock and can start animating
                setDragging(true);

                // Set the offset of the previous position
                position.setOffset(position.__getValue());
                // Set the starting value to 0
                position.setValue({ x: 0, y: 0 });
                // Set scale of selected item
                setScale(1.1, 1000);
            },
            onPanResponderMove: (_, gestureState) => {
                const { dx, dy } = gestureState;
                moveImage(dx, dy);
            },
            onPanResponderRelease: (_, gestureState) => {
                position.flattenOffset();
                setScale(1, 500);
                setDragging(false);
            }
        })
    ).current;

    const animatedStyles = [
        styles.image,
        {
            zIndex: dragging ? 2 : 0,
            transform: [
                ...position.getTranslateTransform(),
                { scale }
            ]
        }
    ];
    return (
        <Animated.Image style={animatedStyles} source={src} {...panResponder.panHandlers} />
    );
};

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 150
    }
});

export default DraggableImage;