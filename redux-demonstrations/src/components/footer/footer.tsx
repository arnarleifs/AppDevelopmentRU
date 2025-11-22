import { AppDispatch, RootState } from "@/src/redux";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../redux/features/user/user-slice";

export function Footer() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.bio}</Text>
      <Button
        onPress={() =>
          dispatch(
            changeUser({
              name: "Mr. Miyaki",
              bio: "Some bio",
            })
          )
        }
      >
        Update user
      </Button>
    </View>
  );
}
