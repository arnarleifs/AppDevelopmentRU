import { AppDispatch, RootState } from "@/src/redux";
import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { incrementCounter } from "../../redux/features/counter/counter-slice";

export function Counter() {
  const dispatch = useDispatch<AppDispatch>();
  const counter = useSelector((state: RootState) => state.counter);

  return (
    <View>
      <Text>Current counter is {counter.value}</Text>
      <Button
        mode="contained"
        onPress={() => dispatch(incrementCounter())}
        icon="plus"
      >
        Increment
      </Button>
    </View>
  );
}
