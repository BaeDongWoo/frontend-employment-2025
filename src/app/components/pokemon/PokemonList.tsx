'use client';
import { usePokemonData } from '@/app/hooks/usePokemon';
import { Spinner } from '../Spinner';
import { useInfiniteScroll } from '@/app/hooks/useInfiniteScroll';

interface PokemonType {
  name: string;
  image: string;
}

export const PokemonList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonData();
  const targetRef = useInfiniteScroll({ fetchNextPage, hasNextPage });

  if (!hasNextPage) return <Spinner />;
  return (
    <>
      <div className="grid grid-cols-4 gap-4 max-w-[500px] m-auto">
        {data?.pages.flat().map((pokemon: PokemonType, index: number) => (
          <div key={index} className="flex flex-col items-center">
            <img src={pokemon.image} className="w-[120px] h-[160px] bg-gray-300 flex items-center justify-center" />
            <div>{pokemon.name}</div>
          </div>
        ))}
      </div>
      <div ref={targetRef} className="h-2"></div>
      {isFetchingNextPage && <Spinner />}
    </>
  );
};
