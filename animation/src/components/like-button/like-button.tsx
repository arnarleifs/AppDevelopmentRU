import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import LikeAnimation from "../like-animation/like-animation";

const LikeImage = require("../../resources/like.png");
const LikedImage = require("../../resources/liked.png");

const LikeButton: React.FC = () => {
  const [hasLike, setHasLike] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);

  const onButtonPress = (): void => {
    setHasLike(!hasLike);
    setAnimation(!hasLike);
  };

  // Determines what the active image is, at the given time
  const activeImage = hasLike ? LikedImage : LikeImage;

  return (
    <View>
      <TouchableOpacity activeOpacity={0.7} onPress={onButtonPress}>
        <Image style={styles.button} source={activeImage} />
      </TouchableOpacity>
      {animation && <LikeAnimation />}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
  },
});

export default LikeButton;
