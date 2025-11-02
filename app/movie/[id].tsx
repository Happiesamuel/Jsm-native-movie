import { icons } from "@/constants/icons";
import useFetch from "@/hooks/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}
function MovieInfo({ label, value }: MovieInfoProps) {
  return (
    <View className="flex-col items-start justify-center mt-5 ">
      <Text className="text-light-200 font-normal text-sm">{label}</Text>
      <Text className="text-light-200 font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
}

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

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date.split("-").at(0) || "N/A"}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres.map((g) => g.name).join(" - ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget ? `$${movie?.budget / 1_000_000} million` : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={
                movie?.revenue
                  ? `$${Math.round(movie?.revenue) / 1_000_000} million`
                  : "N/A"
              }
            />
          </View>
          <MovieInfo
            label="Production Compaines"
            value={
              movie?.production_companies.map((c) => c.name).join(" - ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={router.back}
        className="absolute bottom-5 left-0 right-0 mx-5 rounded-lg bg-accent flex flex-row items-center justify-center z-50 py-3.5"
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt0.5
         rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go back</Text>
      </TouchableOpacity>
    </View>
  );
}
