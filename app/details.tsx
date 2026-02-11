import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, ActivityIndicator } from "react-native";

export default function Details() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError("Failed to load Pokémon");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (error) {
    return <Text style={{ textAlign: "center" }}>{error}</Text>;
  }

  if (!pokemon) return null;

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          textTransform: "capitalize",
        }}
      >
        {pokemon.name}
      </Text>

      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={{ width: 200, height: 200 }}
      />

      <View style={{ marginTop: 20 }}>
        <Text>Height: {pokemon.height}</Text>
        <Text>Weight: {pokemon.weight}</Text>
        <Text>
          Types: {pokemon.types.map((t: any) => t.type.name).join(", ")}
        </Text>
      </View>
    </ScrollView>
  );
}
