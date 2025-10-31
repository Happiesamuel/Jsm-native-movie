import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: MoviesError,
    refetch: laodMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(
    function () {
      async function func() {
        if (searchQuery.trim()) {
          await laodMovies();
        } else {
          reset();
        }
      }
      const timeoutId = setTimeout(func, 500);
      return () => clearTimeout(timeoutId);
    },
    [searchQuery]
  );
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute flex-1 w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-5"
        renderItem={({ item }) => <MovieCard item={item} />}
        ListEmptyComponent={
          !moviesLoading && !MoviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-gray-500 text-center">
                {searchQuery.trim() ? "No movies found" : "Serch for a movie"}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
                placeholder="Search movies..."
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {MoviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {MoviesError.message}
              </Text>
            )}
            {!moviesLoading &&
              !MoviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  );
}
