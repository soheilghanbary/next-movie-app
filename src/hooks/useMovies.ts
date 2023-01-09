import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MovieProps } from "lib/interfaces";

export const useAllMovies = (page: number | string) => {
  const { isLoading, error, data } = useQuery<MovieProps[]>({
    queryKey: ["movies", page],
    queryFn: () => getMovies(page),
  });

  return { data, isLoading };
};

export const useMovies = (page: number | string) => {
  const { data, isLoading, fetchNextPage , fetchPreviousPage , hasNextPage } = useInfiniteQuery<any>({
    queryKey: ["movies"],
    queryFn: ({ pageParam = page }) => getMovies(pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length + 1,
  });
  return { data , isLoading , fetchNextPage , fetchPreviousPage , hasNextPage }
};

const getMovies = async (page: number | string) => {
  const { data } = await axios.get(
    `https://moviesapi.ir/api/v1/movies?page=${page}`
  );
  return data.data;
};

export const useMovie = (movieId: number | string) => {
  const { isLoading, error, data } = useQuery<MovieProps>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId),
  });
  return { data, isLoading };
};

const getMovie = async (movieId: number | string) => {
  const { data } = await axios.get(
    `https://moviesapi.ir/api/v1/movies/${movieId}`
  );
  return data;
};
