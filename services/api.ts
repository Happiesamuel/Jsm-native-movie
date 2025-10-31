export const TMBD_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_BEARER_TOKEN}`,
  },
};

export async function fetchMovies({ query }: { query: string }) {
  const endpoint = query
    ? `${TMBD_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&api_key=${TMBD_CONFIG.API_KEY}`
    : `${TMBD_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${TMBD_CONFIG.API_KEY}`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: TMBD_CONFIG.headers,
  });

  if (!res.ok) throw new Error(`Failed to fetch movies: ${res.statusText}`);
  const data = await res.json();
  return data.results;
}
