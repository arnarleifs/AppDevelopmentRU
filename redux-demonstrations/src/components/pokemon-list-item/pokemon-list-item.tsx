import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface PokemonListItemProps {
  name: string;
  url: string;
}

export function PokemonListItem({ name }: PokemonListItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pokemon-details",
          params: { name },
        })
      }
      style={styles.item}
    >
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "lightgray",
    padding: 10,
    margin: 5,
  },
  title: {
    fontSize: 20,
  },
});
