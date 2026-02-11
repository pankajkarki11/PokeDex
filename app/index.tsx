import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View,StyleSheet, Pressable } from "react-native";

interface Pokemon {
  name: string;
  front_image: string;
  back_image: string;
  types: PokemonData[];
}

interface PokemonData {
type: {
  name: string;
  url: string;
};
}

const colorByType = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",

  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
};



export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20",
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          const pokemonData = await response.json();
          return {
            name: pokemonData.name,

            front_image: pokemonData.sprites.front_default,
            back_image: pokemonData.sprites.back_default,
            types: pokemonData.types,
          };
        }),
      );

      setPokemons(detailedPokemons);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
    contentContainerStyle={{
      padding: 10,
      gap: 10,
    }}
    >
      {pokemons.map((pokemon) => (
        <Link href={`/details`} key={pokemon.name}>
        <View  style={{

          //@ts-ignore
          backgroundColor: colorByType[pokemon.types[0].type.name]+50,
          padding: 20,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          }} >
          <Text style={styles.name}>{pokemon.name}</Text>
          <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              source={{ uri: pokemon.front_image }}
              style={{ width: 150, height: 150 }}
            />
            <Image
          
              source={{ uri: pokemon.back_image }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        </View>
        </Link>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  type: {
    fontSize: 18,
    marginBottom: 5,
    color: 'gray',
    textAlign: 'center',

  },
  })