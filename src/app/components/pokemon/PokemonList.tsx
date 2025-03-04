'use client';
import { usePokemonData } from '@/app/hooks/usePokemon';

interface PokemonType {
  name: string;
  image: string;
}

export const PokemonList = () => {
  const { data, isLoading } = usePokemonData(20, 0);
  if (isLoading) return <p>데이터를 가져오는 중입니다!</p>;
  return (
    <div className="grid grid-cols-4 gap-4 max-w-[500px] m-auto">
      {data.map((pokemon: PokemonType) => (
        <div key={pokemon.name} className="flex flex-col items-center">
          <img src={pokemon.image} className="w-[120px] h-[160px] bg-gray-300 flex items-center justify-center" />
          <div>{pokemon.name}</div>
        </div>
      ))}
    </div>
  );
};
