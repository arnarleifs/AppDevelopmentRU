import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon } from "../types/pokemon";
import { PokemonListResponse } from "../types/pokemon-list-response";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemons: builder.query<PokemonListResponse, void>({
      query: () => "pokemon",
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonsQuery } = pokemonApi;
