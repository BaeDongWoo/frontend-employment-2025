import { InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';

interface infiniteScrollProps {
  hasNextPage: boolean;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

const useInfiniteScroll = ({ hasNextPage, fetchNextPage }: infiniteScrollProps) => {
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

  return targetRef;
};
export { useInfiniteScroll };
