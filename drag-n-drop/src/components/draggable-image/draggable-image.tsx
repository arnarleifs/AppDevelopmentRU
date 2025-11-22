import React, { useRef, useState } from "react";
import {
    Animated,
    ImageSourcePropType,
    ImageStyle,
    PanResponder,
    StyleProp,
    StyleSheet,
} from "react-native";

interface DraggableImageProps {
  src: ImageSourcePropType;
  width?: number;
  height?: number;
  onDragStart?: () => void;
  onDragEnd?: (x: number, y: number) => void;
  style?: StyleProp<ImageStyle>;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
  src,
  width = 200,
  height = 150,
  onDragStart,
  onDragEnd,
  style,
}) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const position = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const setScale = (toValue: number, duration: number): void => {
    Animated.timing(scale, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const moveImage = (dx: number, dy: number): void => {
    position.setValue({ x: dx, y: dy });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true);

        if (onDragStart) {
          onDragStart();
        }

        // @ts-ignore - __getValue() exists but not in types
        position.setOffset(position.__getValue());
        position.setValue({ x: 0, y: 0 });
        setScale(1.1, 1000);
      },
      onPanResponderMove: (_, gestureState) => {
        const { dx, dy } = gestureState;
        moveImage(dx, dy);
      },
      onPanResponderRelease: () => {
        position.flattenOffset();
        setScale(1, 500);
        setDragging(false);

        if (onDragEnd) {
          // @ts-ignore
          const finalX = position.x._value;
          // @ts-ignore
          const finalY = position.y._value;
          onDragEnd(finalX, finalY);
        }
      },
    })
  ).current;

  const animatedStyles = [
    styles.image,
    {
      width,
      height,
      zIndex: dragging ? 2 : 0,
      transform: [...position.getTranslateTransform(), { scale }],
    },
    style,
  ];

  return (
    <Animated.Image
      style={animatedStyles}
      source={src}
      {...panResponder.panHandlers}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 150,
  },
});

export default DraggableImage;
