'use client';
import { usePokemonData } from '@/app/hooks/usePokemon';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Spinner } from '../Spinner';

interface PokemonType {
  name: string;
  image: string;
}

export const PokemonList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonData();
  const targetRef = useRef<HTMLDivElement>(null);
  const observerFn = ([entries]: IntersectionObserverEntry[]) => {
    if (entries?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };
  const infiniteScrollhandler: IntersectionObserverCallback = useCallback(observerFn, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (targetRef.current) {
      observer = new IntersectionObserver(infiniteScrollhandler, { threshold: 0.6 });
      observer.observe(targetRef.current);
    }
    return () => observer && observer.disconnect();
  }, [infiniteScrollhandler]);
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
