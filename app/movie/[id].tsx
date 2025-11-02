import useFetch from "@/hooks/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, View } from "react-native";

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  return (
    <View className="bg-primary flex-1 ">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <Image
          className="h-[500px] w-full"
          resizeMode="stretch"
          source={{
            uri: movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
              : "https://placehold.co/600*400/1a1a1a/ffffff.png",
          }}
        />
      </ScrollView>
    </View>
  );
}
