import { useGetPokemonByNameQuery } from "@/src/services/pokemon/pokemon";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function PokemonDetails() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const { data, error, isLoading } = useGetPokemonByNameQuery(name as string);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading data for {name}</Text>
      ) : error ? (
        <View>
          <Text>Error: {JSON.stringify(error)}</Text>
        </View>
      ) : (
        <>
          <Image
            style={{ height: 100, width: 100 }}
            source={{
              uri: data?.sprites["front_default"],
            }}
          />
          <Text>Name: {data?.name}</Text>
          <Text>Weight: {data?.weight}</Text>
          <Text>Height: {data?.height}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
