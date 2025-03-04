import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const getPokemonData = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(`/api/pokemon?limit=20&offset=${pageParam}`);
  return data;
};

const usePokemonData = () => {
  return useInfiniteQuery({
    queryKey: ['pokemonList'],
    queryFn: getPokemonData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) return undefined;
      return allPages.length * 20;
    },
  });
};

export { usePokemonData };
