import { Client, Databases, ID, Query } from "react-native-appwrite";
import "react-native-url-polyfill/auto";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_MOVIE_APPWRITE_PROJECT_ID!);

// const account = new Account(client);
const database = new Databases(client);
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION!;
export async function updateSearchCount(query: string, movie: Movie) {
  try {
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (res.documents.length > 0) {
      const existingMovie = res.documents.at(0);
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie!.$id,
        {
          count: existingMovie?.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
