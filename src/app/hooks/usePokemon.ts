import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getPokemonData = async (limit: number, offset: number) => {
  const { data } = await axios.get(`/api/pokemon?limit=${limit}&offset=${offset}`);
  return data;
};

const usePokemonData = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['pokemonList', limit, offset],
    queryFn: () => getPokemonData(limit, offset),
  });
};

export { usePokemonData };
