import { PokemonListItem } from "@/src/components/pokemon-list-item/pokemon-list-item";
import { useGetPokemonsQuery } from "@/src/services/pokemon/pokemon";
import React from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";

export default function Pokemons() {
  const { data, error, isLoading } = useGetPokemonsQuery();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading pokemons</Text>
      ) : error ? (
        <Text>An error occurred while loading pokemons</Text>
      ) : (
        <FlatList
          data={data?.results}
          keyExtractor={(p) => p.name}
          renderItem={({ item }) => <PokemonListItem {...item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
